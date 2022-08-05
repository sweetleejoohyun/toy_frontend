import React from 'react';
import {StylesProvider, ThemeProvider} from '@material-ui/styles';
// import {createMuiTheme} from '@material-ui/core';
import { createTheme } from "@material-ui/core";

function Theme(props) {
  const {children} = props;

  const base = {
    mainButtonColor: '#68bd69',
    baseBackgroundColor: '#f0f2f5',

    headerHeight: '7vh',
    headerColor: '#68bd69',

    footerHeight: '3vh',
    footerColor: '#68bd69',
    // fontFamily: 'sans-serif',
    fontColor: '#fff',

    color: '#3b5998',
    hoverButtonColor: '#c5cfe8',
  };

  const muiTheme = {
    base: base,
    palette: {
      background: {
        color: '#f0f2f5',
      }
    },
    objectBox:{
      borderStyle: '1px solid #051e0b',
      labelColor: '#051e0b',
      labelSize: '16px',
      labelWeight: 'bold',
    },
    panel:{
      divider: '5px solid #68bd69',
    },
    title:{
      color: '#051e0b',
    },
    menuButton:{
      buttonColor: '#68bd69',
      fontColor: '#fff',
    }

  };

  const theme = createTheme(muiTheme);
  return (
    <StylesProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StylesProvider>
  );
}

export default Theme;
