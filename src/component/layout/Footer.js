import React from "react";
import {makeStyles, Typography} from "@material-ui/core";


function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.typography}>
                    Copyright 2022 Joohyun all rights reserved.
      </Typography>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.base.footerColor,
    minHeight: theme.base.footerHeight,
    display: "flex",
    justifyContent: "end",

  },
  typography: {
    color: theme.base.fontColor,
    fontSize: theme.spacing(2)
  }
}))

export default Footer;