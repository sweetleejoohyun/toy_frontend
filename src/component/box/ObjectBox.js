import React from 'react'
import {makeStyles, Typography} from "@material-ui/core";

function ObjectBox(){
  const classes = useStyles()

  return(
    <div className={classes.root}>
      <div>
        <img
          className={classes.img}
          src={process.env.PUBLIC_URL +'/images/grapefruit.jpg'}
          alt={'image'}/>
      </div>
      <div className={classes.labelDiv}>
        <Typography className={classes.label}>{'grapefruit'}</Typography>
        <Typography className={classes.label}>{0.22}</Typography>
      </div>

    </div>
  )
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