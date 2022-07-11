import React, { useState } from "react";
import {
  Collapse,
  makeStyles,
  Typography,
  LinearProgress,
  Box,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";

import {
  imageExtension,
  imageTitle,
  messageNotImage,
  objectDetectionTitle,
} from "../../common/Constant";
import OpenFileButton from "../button/OpenFileButton";
import appConfig from "../../common/AppConfig";
import {onAxiosError} from "../../common/Error";


function ImagePanel(){
  const classes = useStyles();
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [displayProgress, setDisplayProgress] = useState(false);
  const [progress, setProgress] = useState(0);

  const onChangeFile = event => {
    const file = event.target.files[0];
    const extArr = imageExtension.split(',');
    // check the extension
    if (extArr.find(element => file.name.endsWith(element))) {
      setOpenAlert(false)
      uploadImage(file)
    } else {
      setSelectedFile()
      setOpenAlert(true)
    }
  };

  // upload image
  const uploadImage = (file) => {
    setDisplayProgress(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('image', file);

    axios
      .post(appConfig.apiRoot + '/image/upload', formData, {
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
        <Typography className={classes.title}> {imageTitle}&nbsp;{objectDetectionTitle} </Typography>
      </div>
      <div className={classes.fileDiv}>
        <div className={classes.uploadDiv}>
          <OpenFileButton
            name={'이미지 열기'}
            onChangeFile={onChangeFile}
            accept={imageExtension}/>
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
          <Collapse in={openAlert}>
            <Alert severity="error">{messageNotImage}</Alert>
          </Collapse>
        </div>
      </div>
      <div className={classes.imgDiv}>
        {selectedFile && (
          <img
            className={classes.img}
            src={URL.createObjectURL(selectedFile)}
            alt={'image'}/>
        )}
      </div>

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
    color: theme.base.fontColor,
    fontFamily: theme.base.fontFamily,
    fontSize: theme.spacing(2.5),
    fontWeight: "bold",
  },
  fileDiv:{
    display: "block",
    alignItems: "center",
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(5),
  },
  uploadDiv:{
    display: "flex",
  },
  filenameTypo: {
    display: "flex",
    alignItems: "center",
    fontSize: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  imgDiv:{
    // width: '50vw',
    height: '75vh',
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

export default ImagePanel;