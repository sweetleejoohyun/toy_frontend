import React, {useState} from "react";
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
  imageBaseSize
} from "../../common/Constant";
import OpenFileButton from "../button/OpenFileButton";
import appConfig, { getImage } from "../../common/AppConfig";
import {onAxiosError} from "../../common/Error";


function ImagePanel(){
  const classes = useStyles();
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [displayProgress, setDisplayProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imgWidth, setImgWidth] = useState(0)
  const [imgHeight, setImgHeight] = useState(0)

  const onChangeFile = event => {
    const file = event.target.files[0];
    const extArr = imageExtension.split(',');
    // check the extension
    if (extArr.find(element => file.name.endsWith(element))) {
      setOpenAlert(false)
      uploadImage(file)
    } else {
      setSelectedFileName('')
      setImagePath('')
      setProgress(0)
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
          setSelectedFileName(file.name);
          setImagePath(response.data.path)
          resizeImage(response.data.info)
        }
      })
      .catch(error => {
        setSelectedFileName('')
        setImagePath('')
        setProgress(0)
        onAxiosError(error);
      })
  };

  const resizeImage = (imageInfo) => {
    const { height, width } = imageInfo;
    const base = Math.max(width, height)
    const ratio = imageBaseSize / base
    setImgWidth(ratio * width)
    setImgHeight(ratio * height)
  }

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
          { selectedFileName?
            <Typography className={classes.filenameTypo}>{selectedFileName}</Typography> : null
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
        {imagePath && (
          <img
            className={classes.img}
            style={{width: `${imgWidth}px`, height: `${imgHeight}px`}}
            src={getImage(imagePath)}
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
    width: '100%',
    height: '75vh',
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(2),
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