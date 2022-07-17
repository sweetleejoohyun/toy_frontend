import React, {useState} from "react";
import {
  Collapse,
  makeStyles,
  Typography,
  Select,
  MenuItem,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import PropTypes from "prop-types";

import {
  imageExtension,
  imageTitle,
  messageNotImage,
  objectDetectionTitle,
  imageBaseSize,
  objectDetectionModels
} from "../../common/Constant";
import OpenFileButton from "../button/OpenFileButton";
import appConfig, { getImage } from "../../common/AppConfig";
import {onAxiosError} from "../../common/Error";


function ImagePanel(props){
  const {setObjectArr} = props
  const classes = useStyles();
  const [model, setModel] = useState(objectDetectionModels[0])
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [imgWidth, setImgWidth] = useState(0)
  const [imgHeight, setImgHeight] = useState(0)
  const [backdrop, setBackdrop] = useState(false);


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
      setObjectArr([])
      setOpenAlert(true)
    }
  };

  // upload image
  const uploadImage = (file) => {
    setBackdrop(true)
    const formData = new FormData();
    formData.append('image', file);

    axios
      .post(appConfig.apiRoot + '/image/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(response => {
        if (response.status === 200) {
          setSelectedFileName(file.name);
          setImagePath(response.data.path)
          runObjectDetection(response.data.path)
          resizeImage(response.data.info)
        }
      })
      .catch(error => {
        setSelectedFileName('')
        setImagePath('')
        setBackdrop(false)
        onAxiosError(error);
      })
  };

  const runObjectDetection = (imagePath) => {
    const data = {path: imagePath}
    axios
      .post(appConfig.apiRoot + '/image/object-detection/' + model.toLowerCase(),
        JSON.stringify(data),
        {
          headers: { 'Content-Type': 'application/json' },
        })
      .then(response => {
        if (response.status === 200) {
          setObjectArr(response.data.result)
          setBackdrop(false)
        }
      })
      .catch(error => {
        setObjectArr([])
        setBackdrop(false)
        onAxiosError(error);
      })
  }

  const resizeImage = (imageInfo) => {
    const { height, width } = imageInfo;
    const base = Math.max(width, height)
    const ratio = imageBaseSize / base
    setImgWidth(ratio * width)
    setImgHeight(ratio * height)
  }

  const handleSelect = (event) => {
    setModel(event.target.value)
  };

  return(
    <div className={classes.root}>
      <div className={classes.topDiv}>
        <Typography className={classes.title}> {imageTitle}&nbsp;{objectDetectionTitle} </Typography>
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
        <div className={classes.uploadDiv}>
          <OpenFileButton
            name={'이미지 열기'}
            onChangeFile={onChangeFile}
            accept={imageExtension}/>
          { selectedFileName?
            <Typography className={classes.filenameTypo}>{selectedFileName}</Typography> : null
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

ImagePanel.propTypes = {
  setObjectArr: PropTypes.func.isRequired,
};

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
  select:{
    minWidth: theme.spacing(25),
    marginLeft: theme.spacing(5),
    textAlign: "center",
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
  backdrop:{
    zIndex: theme.zIndex.drawer + 1,
  }
}));

export default ImagePanel;