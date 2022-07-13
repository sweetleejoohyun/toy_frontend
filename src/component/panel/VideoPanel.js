import React, { useState } from "react";
import {
  Box,
  Collapse, LinearProgress,
  makeStyles,
  Typography
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";

import {
  videoExtension,
  videoTitle,
  messageNotVideo,
  objectDetectionTitle,
  messageRestrictVideoSize,
} from "../../common/Constant";
import VideoPlayer from "../player/VideoPlayer";
import OpenFileButton from "../button/OpenFileButton";
import appConfig from "../../common/AppConfig";
import {onAxiosError} from "../../common/Error";


function VideoPanel(){
  const classes = useStyles();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [displayProgress, setDisplayProgress] = useState(false);
  const [progress, setProgress] = useState(0);

  const onChangeFile = event => {
    const file = event.target.files[0]
    const extArr = videoExtension.split(',')
    // check file size
    if (file.size > 2097152) {
      setAlertMsg(messageRestrictVideoSize)
      setSelectedFile()
      setOpenAlert(true)
    } else {
      // check the extension
      if (extArr.find(element => file.name.endsWith(element))) {
        setOpenAlert(false)
        uploadVideo(file)
      } else {
        setAlertMsg(messageNotVideo)
        setSelectedFile()
        setOpenAlert(true)
      }
    }
  };

  // upload video
  const uploadVideo = (file) => {
    setDisplayProgress(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('video', file);

    axios
      .post(appConfig.apiRoot + '/video/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: progressEvent => {
          const { loaded, total } = progressEvent;
          let percentage = Math.floor((loaded * 100) / total);
          setProgress(percentage);
        },
      })
      .then(response => {
        if (response.status === 200) {
          console.log(response.data.message)
          setSelectedFile(file);
        }
      })
      .catch(error => {
        setSelectedFile()
        onAxiosError(error);
      })
      .finally( () => {
        // setDisplayProgress(false)
      })
  };

  return(
    <div className={classes.root}>
      <div className={classes.topDiv}>
        <Typography className={classes.title}> {videoTitle}&nbsp;{objectDetectionTitle} </Typography>
      </div>
      <div className={classes.fileDiv}>
        <div className={classes.fileTitle}>
          <OpenFileButton
            name={'영상 열기'}
            onChangeFile={onChangeFile}
            accept={videoExtension}/>

          { selectedFile?
            <Typography className={classes.filenameTypo}>{selectedFile.name}</Typography> : null
          }
          { displayProgress?
            <div className={classes.progressDiv}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                  <LinearProgress variant="determinate" value={progress} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <label className={classes.label}>
                    {`${Math.round(progress)}%`}
                  </label>
                </Box>
              </Box>
            </div> : null
          }
        </div>
        <div>
          <Typography  className={classes.fileDesc}> { messageRestrictVideoSize }</Typography>
        </div>
        <div>
          <Collapse in={openAlert}>
            <Alert severity="error">{alertMsg}</Alert>
          </Collapse>
        </div>
      </div>
      <div className={classes.videoDiv}>
        {selectedFile && (
          <VideoPlayer />
        )}
      </div>
    </div>
  )
}


const useStyles = makeStyles(theme => ({
  root:{
    height: '100%',
  },
  topDiv:{
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(5),
  },
  title:{
    fontFamily: theme.base.fontFamily,
    fontSize: theme.spacing(2.5),
    fontWeight: "bold",
  },
  fileDiv:{
    display: "flow-root",
    alignItems: "center",
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(5),
  },
  fileTitle:{
    display: "flex",
  },
  fileDesc:{
    color: "red",
    fontSize: theme.spacing(1.5),
  },
  filenameTypo: {
    display: "flex",
    alignItems: "center",
    fontSize: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  videoDiv:{
    // width: '50vw',
    height: '70vh',
    display: 'flex',
    justifyContent: "center",
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  progressDiv:{
    marginLeft: theme.spacing(3),
    width: '60%',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
}));

export default VideoPanel;