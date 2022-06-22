import React, { useState } from "react";
import {
  Button,
  Collapse,
  makeStyles,
  Typography
} from "@material-ui/core";
import { FolderOpenOutlined } from "@material-ui/icons";
import Alert from '@material-ui/lab/Alert';

import {
  imageExtension,
  imageTitle,
  messageNotImage,
  objectDetectionTitle
} from "../../utils/constant";


function ImageObjectDetection() {
  const classes = useStyles();
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  const onChangeFile = event => {
    const file = event.target.files[0]
    const extArr = imageExtension.split(',')
    // check the extension
    if (extArr.find(element => file.name.endsWith(element))) {
      setSelectedFile(file);
      setOpenAlert(false)
    } else {
      //event.target.value = '';
      setOpenAlert(true)
    }
  };

  return (
    <div className={classes.root}>
      <div>
        <div>
          <Typography className={classes.title}> {imageTitle}&nbsp;{objectDetectionTitle} </Typography>
        </div>
        <div className={classes.fileDiv}>
          <Button className={classes.button} component="label">
            <FolderOpenOutlined />
            열기
            <input
              type="file"
              onChange={onChangeFile}
              style={{ display: 'none' }}
              accept={imageExtension}
            />
          </Button>
          <Collapse in={openAlert}>
            <Alert severity="error">{messageNotImage}</Alert>
          </Collapse>
          { selectedFile? <Typography>{selectedFile.name}</Typography> : null }
        </div>
        <div>
         이미지
        </div>
      </div>
      <div>
        객체 목록
      </div>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root:{
    display: "flex",
  },
  title:{
    fontFamily: theme.base.fontFamily,
    fontSize: theme.spacing(3),
  },
  button:{
    fontFamily: theme.base.fontFamily,
    fontSize: theme.spacing(3)
  },
  fileDiv:{
    display: "flex"
  }
}));

export default ImageObjectDetection;