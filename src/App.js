import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {ThemeProvider, createMuiTheme, makeStyles} from '@material-ui/core/styles'
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";

import ContentContextProvider from "./context/ContentContext"
import Footer from "./components/content/Footer"
import NavBar from "./components/navigation/NavBar"
import Router from "./Router"

function App() {
    const theme = createMuiTheme({
        palette: {
            primary: {
                light: '#62727b',
                main: '#37474f',
                dark: '#102027',
                contrastText: '#fff',
            },
            secondary: {
                light: '#ff7961',
                main: '#f44336',
                dark: '#ba000d',
                contrastText: '#000',
            },
            text: {
                primary: '#fff'
            },
        },
        overrides: {
            MuiCssBaseline: {
                "@global": {
                    body: {
                        backgroundColor: '#000',
                        backgroundImage: "url('background.jpg')",
                        backgroundSize: '100%',
                        backgroundRepeat: 'no-repeat'
                    }
                }
            }
        }
    })
    const useStyles = makeStyles((theme) => ({
        rootContainer: {
            display: 'flex',
            minHeight: '100vh',
            flexDirection: 'column'
        },
        mainGrid: {
            flex: 1
        },
        mainContent: {
            width: 'calc(100% - 320px)',
            // border: '1px solid blue',
            display: 'inline',
        },
        rightSideBanner: {
            width: '300px',
            marginLeft: '20px',
            float: 'right',
            border: '1px solid blue',
            display: 'inline',
        },
    }))
    const classes = useStyles();


    return (
        <ThemeProvider theme={theme}>
            <Container className={classes.rootContainer}>
                <ContentContextProvider>
                    <CssBaseline />
                        <BrowserRouter>

                            <NavBar />

                            <Grid container className={classes.mainGrid}>
                                <Grid item className={classes.mainContent}>
                                    <Router />
                                </Grid>

                                <Grid item className={classes.rightSideBanner}>
                                    <p>
                                        Sidebanner
                                    </p>
                                </Grid>

                            </Grid>

                            <Footer />
                        </BrowserRouter>
                </ContentContextProvider>
            </Container>
        </ThemeProvider>
    );
}

export default App;
