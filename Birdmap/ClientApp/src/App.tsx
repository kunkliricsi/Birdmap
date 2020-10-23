import { Box, Container } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import blue from '@material-ui/core/colors/blue';
import { createMuiTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import React, { useState } from 'react';
import { BrowserRouter, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import Auth from './components/auth/Auth';
import AuthService from './components/auth/AuthService';
import Home from './components/Home';
import './custom.css';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: blue[800]
        },
    },
});

function App() {
    const [authenticated, setAuthenticated] = useState(AuthService.isAuthenticated());

    const onAuthenticated = () => {
        setAuthenticated(AuthService.isAuthenticated());
    };

    const LoginComponent = () => {
        return (
            <Auth onAuthenticated={onAuthenticated} />
        );
    }

    return (
        <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Switch>
                        <PublicRoute path="/login" component={LoginComponent} />
                        <PrivateRoute path="/" exact authenticated={authenticated} component={Home} />
                    </Switch>
                </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;

const PublicRoute = ({ component: Component, ...rest }: { [x: string]: any, component: any}) => {
    return (
        <Route {...rest} render={matchProps => (
            <NoLayout component={Component} {...matchProps} />
        )} />
    );
}

const PrivateRoute = ({ component: Component, authenticated: Authenticated, ...rest }: { [x: string]: any, component: any, authenticated: any }) => {
    return (
        <Route {...rest} render={matchProps => (
            Authenticated
                ? <DefaultLayout component={Component} {...matchProps} />
                : <Redirect to='/login' />
        )} />
    );
};

const NoLayout = ({ component: Component, ...rest }: { [x: string]: any, component: any }) => {
    return (
        <Component {...rest} />
    );
};

const DefaultLayout = ({ component: Component, ...rest }: { [x: string]: any, component: any }) => {
    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <Typography component={'span'}>
                        <Container className="nav-menu">
                            <NavLink exact to="/" className="nav-menu-item" activeStyle={{ color: 'white' }}>Dashboard</NavLink>
                            <NavLink exact to="/login" className="nav-menu-item" activeStyle={{ color: 'white' }}>Login</NavLink>
                        </Container>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box style={{ margin: '32px' }}>
                <Component {...rest} />
            </Box>
        </React.Fragment>
    );
};