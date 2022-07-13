import React from "react";
import {Button, makeStyles} from "@material-ui/core";
import PropTypes from "prop-types";


function CustomButton(props){
  const classes = useStyles();
  const {name, } = props

  return (
    <Button className={classes.button} variant="contained">
      {name}
    </Button>
  )
}

CustomButton.propTypes = {
  name: PropTypes.string.isRequired,
};

const useStyles = makeStyles(theme => ({
  button:{
    backgroundColor: theme.base.mainButtonColor,
    color: theme.base.fontColor,
    fontWeight: "bold",
    '&:hover': {
      backgroundColor: theme.base.hoverButtonColor,
    },
  },

}))

export default CustomButton;