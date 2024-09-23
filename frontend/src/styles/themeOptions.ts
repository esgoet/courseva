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