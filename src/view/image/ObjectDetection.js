import React, {useState} from "react";
import {makeStyles} from "@material-ui/core";

import ImagePanel from "../../component/panel/ImagePanel";
import ObjectPanel from "../../component/panel/ObjectPanel";


function ImageObjectDetection() {
  const classes = useStyles();
  const [objectArr, setObjectArr] = useState([])


  return (
    <div className={classes.root}>
      <div className={classes.leftDiv}>
        <ImagePanel setObjectArr={setObjectArr} />
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
    borderRight: theme.panel.divider,
  },
  rightDiv:{
    width: '50%',
    marginLeft: theme.spacing(6),
  }
}));

export default ImageObjectDetection;