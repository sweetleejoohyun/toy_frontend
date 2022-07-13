import React from "react";
import ObjectPanel from "../../component/panel/ObjectPanel";
import VideoPanel from "../../component/panel/VideoPanel";
import {makeStyles} from "@material-ui/core";


function VideoObjectDetection() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.leftDiv}>
        <VideoPanel />
      </div>
      <div className={classes.rightDiv}>
        <ObjectPanel />
      </div>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root:{
    display: "flex",
    width: '100%',
    backgroundColor: theme.base.baseBackgroundColor,
  },
  leftDiv:{
    width: '50%',
    borderRight: '1px solid #74BBE8FF'
  },
  rightDiv:{
    width: '50%',
    marginLeft: theme.spacing(6),
  }
}));

export default VideoObjectDetection;