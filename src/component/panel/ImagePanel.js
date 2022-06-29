import React, {useState} from "react";
import {Button, Collapse, makeStyles, Typography} from "@material-ui/core";
import {FolderOpenOutlined, Search} from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";

import {
  imageExtension,
  imageTitle,
  messageNotImage,
  objectDetectionTitle
} from "../../utils/constant";


function ImagePanel(){
  const classes = useStyles();
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  const onChangeFile = event => {
    const file = event.target.files[0]
    const extArr = imageExtension.split(',')
    // check the extension
    if (extArr.find(element => file.name.endsWith(element))) {
      setSelectedFile(file);
      setOpenAlert(false)
    } else {
      //event.target.value = '';
      setOpenAlert(true)
    }
  };

  return(
    <div className={classes.root}>
      <div className={classes.topDiv}>
        <Search />
        <Typography className={classes.title}> {imageTitle}&nbsp;{objectDetectionTitle} </Typography>
      </div>
      <div className={classes.fileDiv}>
        <Button className={classes.button} component="label">
          <FolderOpenOutlined/>
          <Typography className={classes.fileTypo}>{'파일열기'}</Typography>
          <input
            type="file"
            onChange={onChangeFile}
            style={{ display: 'none' }}
            accept={imageExtension}
          />
        </Button>
        <Collapse in={openAlert} style={!openAlert && {display: 'none'}}>
          <Alert severity="error">{messageNotImage}</Alert>
        </Collapse>
        { selectedFile?
          <Typography className={classes.filenameTypo}>{selectedFile.name}</Typography> : null }
      </div>
      <div className={classes.imgDiv}>
        {selectedFile && (
          <img
            className={classes.img}
            // src={process.env.PUBLIC_URL +'/images/grapefruit.jpg'}
            src={URL.createObjectURL(selectedFile)}
            alt={'image'}/>
        )}
      </div>
    </div>
  )
}


const useStyles = makeStyles(theme => ({
  root:{
  },
  topDiv:{
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(5),
  },
  title:{
    fontFamily: theme.base.fontFamily,
    fontSize: theme.spacing(2.5),
  },
  fileDiv:{
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(5),
  },
  button:{
    fontFamily: theme.base.fontFamily,
    fontSize: theme.spacing(2),
    marginRight: theme.spacing(1),
    paddingLeft: theme.spacing(0),
  },
  fileTypo:{
    marginLeft: theme.spacing(1)
  },
  filenameTypo: {
    display: "flex",
    alignItems: "center",
    fontSize: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  imgDiv:{
    // width: '50vw',
    height: '75vh',
    display: 'flex',
    justifyContent: "center",
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  img:{
  }
}));

export default ImagePanel;