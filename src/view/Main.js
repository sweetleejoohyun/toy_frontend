import React from 'react'
import {
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { defaultView } from "../common/AppConfig";
import { setPathSession } from "../common/User";


function Main(){
  const classes = useStyles();
  const history = useHistory();

  const handleClick = (event) => {
    const sort = event.currentTarget.name;
    setPathSession(sort);

    history.push({
      pathname: '/' + sort + '/' + defaultView
    });
  }

  return(
    <div className={classes.root}>
      <div className={classes.box}>
        <Button
          className={classes.button}
          onClick={handleClick}
          name={'image'}
        >
          <Typography className={classes.typography}>IMAGE</Typography>
        </Button>
        <Button
          className={classes.button}
          onClick={handleClick}
          name={'video'}
        >
          <Typography className={classes.typography}>VIDEO</Typography>
        </Button>
      </div>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root:{
    backgroundColor: theme.base.baseBackgroundColor,
    height: '100vh',
  },
  box:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: '100%',
  },
  button:{
    backgroundColor: theme.base.mainButtonColor,
    width: '60vh',
    height: '60vh',
    margin: '0 20px',
  },
  typography:{
    fontFamily: theme.base.fontFamily,
    fontWeight: "bold",
    fontSize: theme.spacing(10),
    color: theme.base.color,
  }
}))

export default Main;