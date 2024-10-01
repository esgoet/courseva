import {Link} from "react-router-dom";
import {useState} from "react";
import {
    AppBar,
    Box,
    Button,
    Container,
    Grid2,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import {pages} from "../../utils/constants.ts";
import {useAuth} from "../../hooks/useAuth.ts";



export default function Header() {
    const {user, logout} = useAuth();
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        handleCloseUserMenu();
        logout();
    }

    return (
        <AppBar position={"sticky"} enableColorOnDark>
            <Container maxWidth={"md"}>
                <Toolbar disableGutters>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, mr: 2, flexDirection: 'column', alignItems: 'flex-start', pb: 1 }}>
                        <h1>Courseva</h1>
                        <Typography variant={"caption"} sx={{fontSize: "small", mt: -1.5, ml: 0.5, fontWeight: 500, letterSpacing: "0.7px"}} color={"secondary"}>Your eLearning Platform</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: {xs: 'flex', sm: 'none'} }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', sm: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.title} onClick={handleCloseNavMenu} component={Link} to={page.url}>
                                    {page.title}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{
                        mr: 2,
                        display: {xs: 'flex', sm: 'none'},
                        flexGrow: 1,
                    }}>
                        <h1>Courseva</h1>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } , gap: 1}}>
                        {pages.map((page) => (
                            <Button
                                key={page.title}
                                component={Link}
                                to={page.url}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>
                    {user ?
                        <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }} >
                            <Tooltip title={"Open Account Settings"}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="settings-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenUserMenu}
                                >
                                    <AccountCircle/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                id="settings-appbar"
                                sx={{ mt: '45px' }}
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem divider
                                          sx={{
                                              cursor:'default',
                                              ":hover": {
                                                  background: 'none'
                                              }}}
                                          disableRipple>
                                    <p className={"cursive-font"}>{user.student?.username ?? user.instructor?.username ?? ""}</p>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu} component={Link} to={"/account"}>
                                    Account
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </Box>
                        :

                        <Grid2 container spacing={1}>
                            <Button component={Link} to={"/login"} color={"secondary"} variant={"outlined"} sx={{bgcolor:"rgba(255, 179, 0, 0.1)"}}>Login</Button>
                            <Button component={Link} to={"/register"} color={"secondary"} sx={{bgcolor:"rgba(255, 179, 0, 0.1)"}} variant={"outlined"}>Register</Button>
                        </Grid2>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};