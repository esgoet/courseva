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
            main: '#ff6637'
        }
    },
    typography: {
        h1: {
            fontFamily: 'Playwrite DE SAS',
            fontSize: '2rem',
        },
        h2: {
            fontSize: '1.5rem',
            marginBottom: 5,
            marginTop: 5
        },
        h3: {
            fontSize: '1rem',
            marginBottom: 5
        }
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
        },
        MuiSlider: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled.MuiSlider-colorSuccess': {
                        color: 'var(--mui-palette-success-main)',
                    },
                    '&.Mui-disabled.MuiSlider-colorError': {
                        color: 'var(--mui-palette-error-main)',
                    }
                }
            }
        }
    }
};