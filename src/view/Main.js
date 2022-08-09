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
      <div className={classes.titleDiv}>
        <div className={classes.imgDiv}>
          <img src={process.env.PUBLIC_URL +'/images/tensorflowhub.png'} alt={"tensorflowhub"} />
        </div>
        <div className={classes.labelDiv}>
          <Typography className={classes.title}>Tensorflow hub에 있는 모델을 이용하여<br /> 이미지분석과 영상분석을 합니다.</Typography>
        </div>
      </div>
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
  titleDiv:{
    height: '35%',
  },
  imgDiv:{
    display: "flex",
    justifyContent: "center",
    height: theme.spacing(20),
  },
  labelDiv:{
    display: "flex",
    justifyContent: "center",
    height: theme.spacing(20),
  },
  title:{
    color: theme.base.mainButtonColor,
    fontSize: theme.spacing(4)
  },
  box:{
    display: "flex",
    justifyContent: "center",
    height: '65%',
  },
  button:{
    backgroundColor: theme.base.mainButtonColor,
    width: '40vh',
    height: '40vh',
    margin: '0 20px',
    "&:hover":{
      backgroundColor: '#fbbb37',
    }
  },
  typography:{
    fontFamily: theme.base.fontFamily,
    fontWeight: "bold",
    fontSize: theme.spacing(10),
    color: theme.base.baseBackgroundColor,
  }
}))

export default Main;