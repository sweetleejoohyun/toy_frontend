import React, {useState} from "react";
import ObjectPanel from "../../component/panel/ObjectPanel";
import VideoPanel from "../../component/panel/VideoPanel";
import {makeStyles} from "@material-ui/core";


function VideoObjectDetection() {
  const classes = useStyles();
  const [objectArr, setObjectArr] = useState([])

  return (
    <div className={classes.root}>
      <div className={classes.leftDiv}>
        <VideoPanel setObjectArr={setObjectArr} />
      </div>
      <div className={classes.rightDiv}>
        <ObjectPanel objectArr={objectArr} />
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
    borderRight: '5px solid #8b9dc3'
  },
  rightDiv:{
    width: '50%',
    marginLeft: theme.spacing(6),
  }
}));

export default VideoObjectDetection;