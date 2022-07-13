import React from "react";
import {
  Button,
  makeStyles,
  Typography
} from "@material-ui/core";
import PropTypes from "prop-types";
import {FolderOpenOutlined} from "@material-ui/icons";


function OpenFileButton(props){
  const classes = useStyles();
  const {name, onChangeFile, accept } = props

  return (
    <Button className={classes.button} component="label">
      <FolderOpenOutlined/>
      <Typography className={classes.typo}>{name}</Typography>
      <input
        type="file"
        onChange={onChangeFile}
        style={{ display: 'none' }}
        accept={accept}
      />
    </Button>
  )
}

OpenFileButton.propTypes = {
  name: PropTypes.string.isRequired,
  onChangeFile: PropTypes.func.isRequired,
  accept: PropTypes.string.isRequired,
};

const useStyles = makeStyles(theme => ({
  button:{
    backgroundColor: theme.base.mainButtonColor,
    color: theme.base.fontColor,
    '&:hover': {
      backgroundColor: theme.base.hoverButtonColor,
    },
  },
  typo:{
    color: theme.base.fontColor,
    fontSize: theme.spacing(2),
    fontWeight: "bold",
    marginLeft: theme.spacing(1)
  }

}))

export default OpenFileButton;