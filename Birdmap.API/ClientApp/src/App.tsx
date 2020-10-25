import { Box, Container } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import { createMuiTheme, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import React, { useState } from 'react';
import { BrowserRouter, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import BirdmapTitle from './common/components/BirdmapTitle';
import Auth from './components/auth/Auth';
import AuthService from './components/auth/AuthService';


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

    const onAuthenticated = () => {
        setAuthenticated(AuthService.isAuthenticated());
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
                        <PrivateRoute path="/" exact authenticated={authenticated} component={DashboardComponent} />
                        <PrivateRoute path="/devices" exact authenticated={authenticated} component={DevicesComponent} />
                        <PrivateRoute path="/heatmap" exact authenticated={authenticated} component={HeatmapComponent} />
                    </Switch>
                </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;

const PublicRoute = ({ component: Component, ...rest }: { [x: string]: any, component: any}) => {
    return (
        <Route {...rest} render={matchProps => (
            <DefaultLayout component={Component} authenticated={false} {...matchProps} />
        )} />
    );
}

const PrivateRoute = ({ component: Component, authenticated: Authenticated, ...rest }: { [x: string]: any, component: any, authenticated: any }) => {
    return (
        <Route {...rest} render={matchProps => (
            Authenticated
                ? <DefaultLayout component={Component} authenticated={Authenticated} {...matchProps} />
                : <Redirect to='/login' />
        )} />
    );
};

const DefaultLayout = ({ component: Component, authenticated: Authenticated, ...rest }: { [x: string]: any, component: any, authenticated: any }) => {
    const classes = useDefaultLayoutStyles();

    const renderNavLinks = () => {
        return Authenticated
            ? <Container className={classes.nav_menu}>
                <NavLink exact to="/" className={classes.nav_menu_item} activeClassName={classes.nav_menu_item_active}>Dashboard</NavLink>
                <NavLink exact to="/devices" className={classes.nav_menu_item} activeClassName={classes.nav_menu_item_active}>Devices</NavLink>
                <NavLink exact to="/heatmap" className={classes.nav_menu_item} activeClassName={classes.nav_menu_item_active}>Heatmap</NavLink>
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
                <Component {...rest} />
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