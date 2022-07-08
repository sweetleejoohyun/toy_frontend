import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import PopperMenu from "../menu/PopperMenu";
import { ExitToApp } from "@material-ui/icons";
import { removePathSession } from "../../common/User";

function Header() {
  const classes = useStyles()

  const handleOut = () => {
    removePathSession()
    window.location = '/';
  }

  return (
    <div className={classes.root}>
      <div className={classes.menuArea}>
        <div className={classes.empty}></div>
        <div className={classes.menu}>
          <PopperMenu menu={'이미지'} menuItems={imageMenuItems}/>
        </div>
        <div className={classes.menu}>
          <PopperMenu menu={'영상'} menuItems={videoMenuItems}/>
        </div>
      </div>
      <div className={classes.out}>
        <Button onClick={handleOut}>
          <ExitToApp />
        </Button>
      </div>
    </div>
  )
}

const imageMenuItems = [
  { name: '객체검출',
    path: '/image/object-detection' },
]

const videoMenuItems = [
  { name: '객체검출',
    path: '/video/object-detection' },
]

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.base.headerColor,
    minHeight: theme.base.headerHeight,
    display: "flex",
    justifyContent: "space-between",
  },
  menuArea:{
    display: "flex",
  },
  empty: {
    width: theme.spacing(10),
  },
  menu: {
    width: theme.spacing(15),
  },
  out:{
    display: "flex",
  }
}))

export default Header;