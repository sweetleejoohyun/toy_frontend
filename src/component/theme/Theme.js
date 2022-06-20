import React from 'react';
import {StylesProvider, ThemeProvider} from '@material-ui/styles';
import {createMuiTheme} from '@material-ui/core';

function Theme(props) {
    const {children} = props;

    const base = {
        headerHeight: '7vh',
        headerColor: '#b9d5e8',
        footerHeight: '3vh',
        footerColor: '#b9d5e8',
        fontFamily: 'sans-serif',
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

    const theme = createMuiTheme(muiTheme);

    return (
        <StylesProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </StylesProvider>
    );
}

export default Theme;
