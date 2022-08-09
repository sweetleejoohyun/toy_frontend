import React, {useEffect, useState} from "react";
import {
  Backdrop,
  CircularProgress,
  Collapse,
  makeStyles,
  MenuItem,
  Select,
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
  objectDetectionModels, modelName,
} from "../../common/Constant";
import VideoPlayer from "../player/VideoPlayer";
import OpenFileButton from "../button/OpenFileButton";
import appConfig from "../../common/AppConfig";
import {onAxiosError} from "../../common/Error";


function VideoPanel(props){
  const {setObjectArr} = props
  const classes = useStyles();
  const [model, setModel] = useState(objectDetectionModels[0])
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [videoPath, setVideoPath] = useState('');
  const [fps, setFps] = useState(0);
  const [frameNo, setFrameNo] = useState(-1);
  const [allResult, setAllResult] = useState([]);
  const [backdrop, setBackdrop] = useState(false);

  useEffect(() => {
    if(frameNo > 0) {
      setObjectArr(allResult[frameNo])
    }
  }, [frameNo])

  const onChangeFile = event => {
    const file = event.target.files[0]
    const extArr = videoExtension.split(',')
    // check file size
    if (file.size > 2097152) {
      setAlertMsg(messageRestrictVideoSize)
      setSelectedFileName('')
      setOpenAlert(true)
    } else {
      // check the extension
      if (extArr.find(element => file.name.endsWith(element))) {
        setOpenAlert(false)
        uploadVideo(file)
      } else {
        setAlertMsg(messageNotVideo)
        setSelectedFileName('')
        setOpenAlert(true)
      }
    }
  };

  // upload video
  const uploadVideo = (file) => {
    setBackdrop(true)
    const formData = new FormData();
    formData.append('video', file);

    axios
      .post(appConfig.apiRoot + '/video/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(response => {
        if (response.status === 200) {
          setSelectedFileName(file.name);
          setVideoPath(response.data.path)
          runObjectDetection(response.data.path)
        }
      })
      .catch(error => {
        setSelectedFileName('')
        setVideoPath('')
        setBackdrop(false)
        onAxiosError(error);
      })
  };

  const runObjectDetection = (imagePath) => {
    const data = {path: imagePath}
    axios
      .post(appConfig.apiRoot + '/video/object-detection/' + model.toLowerCase(),
        JSON.stringify(data),
        {
          headers: { 'Content-Type': 'application/json' },
        })
      .then(response => {
        if (response.status === 200) {
          setBackdrop(false)
          setAllResult(response.data.result)
          setFps(response.data.fps)
        }
      })
      .catch(error => {
        setObjectArr([])
        setBackdrop(false)
        setFps(0)
        onAxiosError(error);
      })
  }

  const handleSelect = (event) => {
    setModel(event.target.value)
  };

  return(
    <div className={classes.root}>
      <div className={classes.topDiv}>
        <Typography className={classes.title}> {videoTitle}&nbsp;{objectDetectionTitle} </Typography>
        <Typography className={classes.modelTitle}>{modelName}</Typography>
        <Select
          className={classes.select}
          name="model"
          value={model}
          onChange={handleSelect}
        >
          {objectDetectionModels.map((model, index) => {
            return(
              <MenuItem key={index} value={model}>{model}</MenuItem>
            )
          })}
        </Select>
      </div>
      <div className={classes.fileDiv}>
        <div className={classes.fileTitle}>
          <OpenFileButton
            name={'영상 열기'}
            onChangeFile={onChangeFile}
            accept={videoExtension}/>

          { selectedFileName?
            <Typography className={classes.filenameTypo}>{selectedFileName}</Typography> : null
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
        {videoPath && (
          <VideoPlayer
            videoPath={videoPath}
            fps={fps}
            setFrameNo={setFrameNo}
            setObjectArr={setObjectArr}
          />
        )}
      </div>
      <Backdrop
        className={classes.backdrop}
        open={backdrop}>
        <CircularProgress
          color="primary"
          style={{ width: '100px', height: '100px' }}/>
      </Backdrop>
    </div>
  )
}


const useStyles = makeStyles(theme => ({
  topDiv:{
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(5),
  },
  title:{
    color: theme.title.color,
    fontFamily: theme.base.fontFamily,
    fontSize: theme.spacing(3),
    fontWeight: "bold",
  },
  modelTitle:{
    color: theme.title.color,
    fontSize: theme.spacing(2),
    marginLeft: theme.spacing(5),
  },
  select:{
    minWidth: theme.spacing(25),
    marginLeft: theme.spacing(1),
    textAlign: "center",
  },
  fileDiv:{
    display: "block",
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
    width: '100%',
    height: '70vh',
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  backdrop:{
    zIndex: theme.zIndex.drawer + 1,
  }
}));

export default VideoPanel;