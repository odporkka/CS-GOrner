import { createMuiTheme } from "@material-ui/core/styles"

/**
 * Default theme to use across the site.
 * These values are merged to
 *
 * @type {Theme}
 */
export const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#62727b',
            main: '#37474f',
            dark: '#102027',
            contrastText: '#f8f7ed',
            contrastTextDarker: '#f8f7ed'
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
        },
        MuiPaper: {
            root: {
                backgroundColor: '#62727b',
            }
        }
    }
})
