import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.ts";
import {useContext, useState} from "react";
import {AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import {pages} from "../../utils/constants.ts";

type HeaderProps = {
    logout: () => void;
}


export default function Header({logout}:Readonly<HeaderProps>) {
    const {user} = useContext(AuthContext);
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
            <Container maxWidth={"xl"}>
                <Toolbar disableGutters>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                        <Link to={"/"}>
                            <h1>C&Learn</h1>
                        </Link>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: {xs: 'flex', md: 'none'} }}>
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
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                                    <Link to={page.url}>{page.title}</Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{
                        mr: 2,
                        display: {xs: 'flex', md: 'none'},
                        flexGrow: 1,
                    }}>
                        <h1>C&Learn</h1>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.title}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <Link to={page.url}>{page.title}</Link>
                            </Button>
                        ))}
                    </Box>
                    {user ?
                        <Box sx={{ flexGrow: 0 }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="settings-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenUserMenu}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
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

                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Link to={"/account"}>My Account</Link>
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </Box>
                        :
                        <>
                            <Link to={"/register"}>Register</Link>
                            <Link to={"/login"}>Login</Link>
                        </>
                    }

                </Toolbar>
            </Container>

        </AppBar>
        // <header>
        //     <h1>Learning Management System</h1>
        //     {user ? <button onClick={logout}>Logout</button> :
        //         <>
        //             <Link to={"/register"}>Register</Link>
        //             <Link to={"/login"}>Login</Link>
        //         </>
        //     }
        // </header>
    );
};