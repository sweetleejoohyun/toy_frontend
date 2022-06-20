import React from 'react';
import {Grid, makeStyles} from '@material-ui/core';

import Header from "./Header";
import Section from "./Section";
import Footer from "./Footer";


function Layout() {
    const classes = useStyles();

    return (
        <Grid className={classes.container}>
            <Header/>
            <Section/>
            <Footer/>
        </Grid>
    );
}

const useStyles = makeStyles(theme => ({
    container: {
        height: '100vh',
        width: '100vw',
        backgroundColor: theme.palette.background.color,
    },
}));

export default Layout;
