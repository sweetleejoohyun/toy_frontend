import React from "react";
import {makeStyles} from "@material-ui/core";
import PopperMenu from "../menu/PopperMenu";

function Header() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.empty}></div>
            <div className={classes.menu}>
                <PopperMenu menu={'이미지'} menuItems={imageMenuItems}/>
            </div>
            <div className={classes.menu}>
                <PopperMenu menu={'영상'} menuItems={videoMenuItems}/>
            </div>
        </div>
    )
}

const imageMenuItems = [
    {name: '객체검출'},
    {name: '객체검출2'},
    {name: '객체검출3'}
]

const videoMenuItems = [
    {name: '객체검출'},
    {name: '객체검출2'},
    {name: '객체검출3'}
]

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.base.headerColor,
        minHeight: theme.base.headerHeight,
        display: "flex",
    },
    empty: {
        width: theme.spacing(10)
    },
    menu: {
        marginRight: theme.spacing(1),
    }
}))

export default Header;