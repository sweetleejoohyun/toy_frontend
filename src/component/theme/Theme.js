import React from 'react';
import {StylesProvider, ThemeProvider} from '@material-ui/styles';
// import {createMuiTheme} from '@material-ui/core';
import { createTheme } from "@material-ui/core";

function Theme(props) {
  const {children} = props;

  const base = {
    mainButtonColor: '#8b9dc3',
    baseBackgroundColor: '#f0f2f5',

    headerHeight: '7vh',
    headerColor: '#8b9dc3',

    footerHeight: '3vh',
    footerColor: '#8b9dc3',

    fontFamily: 'sans-serif',
    fontColor: '#0D275DFF',

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

  };

  const theme = createTheme(muiTheme);
  return (
    <StylesProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StylesProvider>
  );
}

export default Theme;
