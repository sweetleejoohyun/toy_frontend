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
      <div>
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
    width: theme.spacing(20),
    backgroundColor: '#E0E0E0FF'
  },
  img:{
    width: '100%',
    height: '100%',
  },
  label:{
    display: "flex",
    justifyContent: "center",
  },
}));

export default ObjectBox