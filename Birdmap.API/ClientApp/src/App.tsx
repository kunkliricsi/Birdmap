import { Box, Container, IconButton, Menu, MenuItem, MenuList, Paper, Grow, Popper } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import { createMuiTheme, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import React, { useState, } from 'react';
import { BrowserRouter, NavLink, Redirect, Route, Switch, Link } from 'react-router-dom';
import BirdmapTitle from './common/components/BirdmapTitle';
import Auth from './components/auth/Auth';
import AuthService from './components/auth/AuthService';
import { ClickAwayListener } from '@material-ui/core';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: blue[900],
        },
        secondary: {
            main: orange[200],
        }
    },
});

function App() {

    const [authenticated, setAuthenticated] = useState(AuthService.isAuthenticated());
    const [isAdmin, setIsAdmin] = useState(AuthService.isAdmin());

    const onAuthenticated = () => {
        setAuthenticated(AuthService.isAuthenticated());
        setIsAdmin(AuthService.isAdmin());
    };

    const AuthComponent = () => {
        return (
            <Auth onAuthenticated={onAuthenticated} />
        );
    }

    const DashboardComponent = () => {
        return <Typography>Dashboard</Typography>;
    };

    const DevicesComponent = () => {
        return <Typography>Devices</Typography>;

    };
    const HeatmapComponent = () => {
        return <Typography>Heatmap</Typography>;
    };

    return (
        <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Switch>
                        <PublicRoute path="/login" component={AuthComponent} />
                        <PrivateRoute path="/" exact authenticated={authenticated} isAdmin={isAdmin} component={DashboardComponent} />
                        <PrivateRoute path="/devices" exact authenticated={authenticated} isAdmin={isAdmin} component={DevicesComponent} />
                        <PrivateRoute path="/heatmap" exact authenticated={authenticated} isAdmin={isAdmin} component={HeatmapComponent} />
                    </Switch>
                </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;

const PublicRoute = ({ component: Component, ...rest }: { [x: string]: any, component: any}) => {
    return (
        <Route {...rest} render={matchProps => (
            <DefaultLayout component={Component} authenticated={false} isAdmin={false} {...matchProps} />
        )} />
    );
}

const PrivateRoute = ({ component: Component, authenticated: Authenticated, isAdmin: IsAdmin, ...rest }: { [x: string]: any, component: any, authenticated: any, isAdmin: any }) => {
    return (
        <Route {...rest} render={matchProps => (
            Authenticated
                ? <DefaultLayout component={Component} authenticated={Authenticated} isAdmin={IsAdmin} {...matchProps} />
                : <Redirect to='/login' />
        )} />
    );
};

const DefaultLayout = ({ component: Component, authenticated: Authenticated, isAdmin: IsAdmin, ...rest }: { [x: string]: any, component: any, authenticated: any, isAdmin: any }) => {
    const classes = useDefaultLayoutStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    const handleLogout = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        AuthService.logout();
        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);


    const renderNavLinks = () => {
        return Authenticated
            ? <Container className={classes.nav_menu}>
                <NavLink exact to="/" className={classes.nav_menu_item} activeClassName={classes.nav_menu_item_active}>Dashboard</NavLink>
                <NavLink exact to="/devices" className={classes.nav_menu_item} activeClassName={classes.nav_menu_item_active}>Devices</NavLink>
                <NavLink exact to="/heatmap" className={classes.nav_menu_item} activeClassName={classes.nav_menu_item_active}>Heatmap</NavLink>
                <IconButton className={classes.nav_menu_icon}
                    ref={anchorRef}
                    aria-haspopup="true"
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-label="account of current user"
                    onClick={handleToggle}>
                    <AccountCircle/>
                </IconButton>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <MenuItem onClick={handleLogout} component={Link} {...{ to: '/login' }}>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Container>
            : null;
    };

    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <BirdmapTitle />
                    <Typography component={'span'} className={classes.typo}>
                        {renderNavLinks()}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box style={{ margin: '32px' }}>
                <Component isAdmin={IsAdmin} {...rest} />
            </Box>
        </React.Fragment>
    );
};

const useDefaultLayoutStyles = makeStyles((theme: Theme) =>
    createStyles({
        typo: {
            marginLeft: 'auto',
            color: 'white',
        },
        nav_menu: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        nav_menu_icon: {
            color: 'inherit',
            marginLeft: '24px',
            '&:hover': {
                color: 'inherit',
            }
        },
        nav_menu_item: {
            textDecoration: 'none',
            fontWeight: 'normal',
            color: 'inherit',
            marginLeft: '24px',
            '&:hover': {
                color: 'inherit',
            }
        },
        nav_menu_item_active: {
            textDecoration: 'underline',
            fontWeight: 'bold',
            color: 'inherit',
            marginLeft: '24px',
            '&:hover': {
                color: 'inherit',
            }
        },
    }),
);