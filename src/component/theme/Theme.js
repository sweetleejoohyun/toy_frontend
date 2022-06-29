import React from 'react';
import {StylesProvider, ThemeProvider} from '@material-ui/styles';
// import {createMuiTheme} from '@material-ui/core';
import { createTheme } from "@material-ui/core";

function Theme(props) {
  const {children} = props;

  const base = {
    mainButtonColor: '#74BBE8FF',
    headerHeight: '7vh',
    baseBackgroundColor: '#b9d5e8',
    // baseBackgroundColor: '#FFFFFFFF',
    headerColor: '#74BBE8FF',
    footerHeight: '3vh',
    footerColor: '#74BBE8FF',
    // fontFamily: 'sans-serif',
    fontfamily: 'Noto Sans KR',
    color: '#06063BFF'
  };

  const muiTheme = {
    base: base,
    palette: {
      background: {
        color: '#FFFFFF',
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
