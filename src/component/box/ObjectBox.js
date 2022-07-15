import React from 'react'
import {
  makeStyles,
  Typography
} from "@material-ui/core";
import PropTypes from "prop-types";

import {getImage} from "../../common/AppConfig";


function ObjectBox(props){
  const {objectInfo} = props
  const classes = useStyles()

  return(
    <div className={classes.root}>
      <div className={classes.imgDiv}>
        <img
          className={classes.img}
          // src={process.env.PUBLIC_URL +'/images/grapefruit.jpg'}
          src={getImage(objectInfo.obj_path)}
          alt={'image'}/>
      </div>
      <div className={classes.labelDiv}>
        <Typography className={classes.label}>{objectInfo.obj}</Typography>
        <Typography className={classes.label}>{objectInfo.score}</Typography>
      </div>
    </div>
  )
}

ObjectBox.prototype = {
  objectInfo: PropTypes.object.isRequired
}

const useStyles = makeStyles(theme => ({
  root:{
    display: "inline-table",
    width: theme.spacing(25),
    height: theme.spacing(25),
    border: theme.objectBox.borderStyle,
  },
  imgDiv:{
    display: "flex",
    justifyContent: "center",
    height: theme.spacing(20),
    borderBottom: theme.objectBox.borderStyle,
  },
  img:{
    maxWidth: '100%',
    maxHeight: '100%',
  },
  label:{
    display: "flex",
    justifyContent: "center",
    color: theme.objectBox.labelColor,
    fontSize: theme.objectBox.labelSize,
    fontWeight: theme.objectBox.labelWeight,
  },
}));

export default ObjectBox