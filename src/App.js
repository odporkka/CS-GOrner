import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";


import ContentContextProvider from "./context/ContentContext"
import NavBar from "./components/navigation/NavBar"
import Router from "./Router"

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
        background: {
            default: "#102027"
        }
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <ContentContextProvider>
                <CssBaseline />
                <div className="App" style={{backgroundColor: theme.palette.primary.dark}}>
                    <BrowserRouter>
                        <header className="App-header">
                            <NavBar />
                        </header>
                        <Router />
                    </BrowserRouter>
                </div>
            </ContentContextProvider>
        </ThemeProvider>

    );
}

export default App;
