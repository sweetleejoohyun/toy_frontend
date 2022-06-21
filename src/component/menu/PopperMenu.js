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

function PopperMenu(props) {
  const classes = useStyles()
  const {menu, menuItems} = props;

  const [open, setOpen] = useState(false);
  const ref = useRef();

  // const prevOpen = useRef(open);
  // useEffect(() => {
  //     if (prevOpen.current === true && open === false) {
  //         ref.current.focus();
  //     }
  //
  //     prevOpen.current = open;
  // }, [open]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    // if (ref.current && ref.current.contains(event.target)) {
    //     return;
    // }
    setOpen(false);
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
                      onClick={handleClose}>
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
    alignContent: "center",
    minWidth: theme.spacing(3),
    height: '100%'
  },
  button: {
    color: theme.base.color,
    fontFamily: theme.base.fontFamily,
    fontSize: theme.spacing(3),
    fontWeight: "bolder"
  },
  menuList: {
    backgroundColor: theme.base.headerColor,
  },
  menuItem: {
    color: theme.base.color,
  }
}))

export default PopperMenu;
