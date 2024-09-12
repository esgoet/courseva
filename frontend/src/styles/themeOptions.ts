import { ThemeOptions } from '@mui/material/styles';


export const themeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#4c83f5',
        },
        secondary: {
            main: '#ffb300',
        },
        info: {
            main: '#0288d1',
        }
    },
    typography: {
        h1: {
            fontFamily: 'Playwrite DE SAS',
            fontSize: '5rem',
        },
    },
    components: {
        MuiInput: {
            styleOverrides: {
                root: {
                    '&::before, &::after': {
                        borderBottom: '1px solid transparent'
                    }
                }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    '&.Mui-focusVisible': {
                        backgroundColor: 'rgba(76,131,245,0.2)',
                    }
                }
        }
        }
    }
};