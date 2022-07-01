import React, { useState } from "react";
import {
  Button,
  Collapse,
  makeStyles,
  Typography
} from "@material-ui/core";
import {
  FolderOpenOutlined,
  Search
} from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";

import {
  videoExtension,
  videoTitle,
  messageNotVideo,
  objectDetectionTitle,
} from "../../utils/constant";
import VideoPlayer from "../player/VideoPlayer";


function VideoPanel(){
  const classes = useStyles();
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  const onChangeFile = event => {
    const file = event.target.files[0]
    const extArr = videoExtension.split(',')
    // check the extension
    if (extArr.find(element => file.name.endsWith(element)) && file.size < 1600000) {
      setSelectedFile(file);
      setOpenAlert(false)
    } else {
      //event.target.value = '';
      setOpenAlert(true)
    }
  };

  return(
    <div className={classes.root}>
      <div className={classes.topDiv}>
        <Search />
        <Typography className={classes.title}> {videoTitle}&nbsp;{objectDetectionTitle} </Typography>
      </div>
      <div className={classes.fileDiv}>
        <Button className={classes.button} component="label">
          <FolderOpenOutlined/>
          <Typography className={classes.fileTypo}>{'파일열기'}</Typography>
          <input
            type="file"
            onChange={onChangeFile}
            style={{ display: 'none' }}
            accept={videoExtension}
          />
        </Button>
        <Collapse in={openAlert} style={!openAlert && {display: 'none'}}>
          <Alert severity="error">{messageNotVideo}</Alert>
        </Collapse>
        { selectedFile?
          <Typography className={classes.filenameTypo}>{selectedFile.name}</Typography> : null }
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
  },
  fileDiv:{
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(5),
  },
  button:{
    fontFamily: theme.base.fontFamily,
    fontSize: theme.spacing(2),
    marginRight: theme.spacing(1),
    paddingLeft: theme.spacing(0),
  },
  fileTypo:{
    marginLeft: theme.spacing(1)
  },
  filenameTypo: {
    display: "flex",
    alignItems: "center",
    fontSize: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  videoDiv:{
    // width: '50vw',
    height: '75vh',
    display: 'flex',
    justifyContent: "center",
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

export default VideoPanel;