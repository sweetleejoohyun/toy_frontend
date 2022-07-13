import React, { useRef, useState } from "react";
import {
  Button,
  ClickAwayListener,
  Grow, makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Popper
} from "@material-ui/core";
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";


function PopperMenu(props) {
  const classes = useStyles()
  const {menu, menuItems} = props;

  const [open, setOpen] = useState(false);
  const ref = useRef();
  const history = useHistory();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleMenuItem = (path) => () => {
    setOpen(false);
    history.push(path)
  };

  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        ref={ref}
        onClick={handleToggle}
      >
        {menu}
      </Button>
      <Popper open={open} anchorEl={ref.current} transition>
        {({TransitionProps, placement}) => (
          <Grow
            {...TransitionProps}
            style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} className={classes.menuList}>
                  {menuItems.map((menuItem, index) => (
                    <MenuItem
                      className={classes.menuItem}
                      key={index}
                      onClick={handleMenuItem(menuItem.path)}>
                      {menuItem.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}

PopperMenu.propTypes = {
  menu: PropTypes.string.isRequired,
  menuItems: PropTypes.array.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: '100%'
  },
  button: {
    width: '100px',
    color: theme.base.fontColor,
    fontFamily: theme.base.fontFamily,
    fontSize: theme.spacing(3),
    fontWeight: "bolder"
  },
  menuList: {
    backgroundColor: theme.base.headerColor,
    width: theme.spacing(15)
  },
  menuItem: {
    color: theme.base.fontColor,
    justifyContent: "center"
  }
}))

export default PopperMenu;
