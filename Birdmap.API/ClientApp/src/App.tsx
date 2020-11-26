import { Box, Paper } from '@material-ui/core';
import { blueGrey, grey, orange } from '@material-ui/core/colors';
import { createMuiTheme, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import React, { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import BirdmapBar from './components/appBar/BirdmapBar';
import Auth from './components/auth/Auth';
import AuthService from './components/auth/AuthService';
import Dashboard from './components/dashboard/Dashboard';
import Devices from './components/devices/Devices';
import MapContainer from './components/heatmap/Heatmap';
import Logs from './components/logs/Logs';
import DevicesContextProvider from './contexts/DevicesContextProvider';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: blueGrey[900],
            dark: grey[400],
        },
        secondary: {
            main: blueGrey[700],
            dark: blueGrey[50],
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

    const LogsComponent = () => {
        return <Logs/>
    }

    const DashboardComponent = () => {
        return <Dashboard isAdmin={isAdmin}/>;
    };

    const DevicesComponent = () => {
        return <Devices isAdmin={isAdmin}/>;

    };

    const HeatmapComponent = () => {
        return (
            <Paper elevation={0}>
                <MapContainer />
            </Paper>
        );
    };

    const HeaderComponent = () => {
        return (
            <BirdmapBar onLogout={AuthService.logout} isAdmin={isAdmin} isAuthenticated={authenticated}/>
        );
    }

    const PredicateRoute = ({ component: Component, predicate: Predicate, ...rest }: { [x: string]: any, component: any, predicate: any }) => {
        return (
            <PredicateRouteInternal {...rest} header={HeaderComponent} body={Component} predicate={Predicate}/>
        );
    }

    const PublicRoute = ({ component: Component, ...rest }: { [x: string]: any, component: any }) => {
        return (
            <PredicateRoute {...rest} component={Component} predicate={true}/>
        );
    }

    const PrivateRoute = ({ component: Component, ...rest }: { [x: string]: any, component: any }) => {
        return (
            <PredicateRoute {...rest} component={Component} predicate={authenticated}/>
        );
    }

    const AdminRoute = ({ component: Component, ...rest }: { [x: string]: any, component: any }) => {
        return (
            <PredicateRoute {...rest} component={Component} predicate={authenticated && isAdmin}/>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>
                    <PublicRoute      exact path="/login"           component={AuthComponent} />
                    <AdminRoute       exact path="/logs"            component={LogsComponent} />
                    <DevicesContextProvider>
                        <PrivateRoute exact path="/"                component={DashboardComponent} />
                        <PrivateRoute exact path="/devices/:id?"    component={DevicesComponent} />
                        <PrivateRoute exact path="/heatmap"         component={HeatmapComponent} />
                    </DevicesContextProvider>
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;

const PredicateRouteInternal = ({ header: HeaderComponent, body: BodyComponent, predicate: Predicate, ...rest }: { [x: string]: any, header: any, body: any, predicate: any }) => {
    return (
        <Route {...rest} render={matchProps => (
            Predicate
                ? <DefaultLayoutInternal header={HeaderComponent} body={BodyComponent} {...matchProps} />
                : <Redirect to='/login' />
        )} />
    );
};

const DefaultLayoutInternal = ({ header: HeaderComponent, body: BodyComponent, ...rest }: { [x: string]: any, header: any, body: any }) => {
    const classes = useDefaultLayoutStyles();

    return (
        <React.Fragment>
            <Box className={classes.header}>
                <HeaderComponent />
            </Box>
            <Box className={classes.body}>
                <BodyComponent {...rest} />
            </Box>
        </React.Fragment>
    );
};

const useDefaultLayoutStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            height: '7%',
        },
        body: {
            backgroundColor: theme.palette.primary.dark,
            height: '93%',
        }
    }),
);