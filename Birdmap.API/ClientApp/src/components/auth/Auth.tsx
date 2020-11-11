import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Grid, TextField, Button, Typography, Paper, CircularProgress } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AuthService from './AuthService';

export default function Auth(props: any) {
    props.onAuthenticated();
    const history = useHistory();
    const classes = useStyles();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const onUsernameChanged = (event: any) => {
        setUsername(event.target.value);

        setShowError(false);
        setErrorMessage('');
    };

    const onPasswordChanged = (event: any) => {
        setPassword(event.target.value);

        setShowError(false);
        setErrorMessage('');
    };

    const onPasswordKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            onLoginClicked();
        }
    };

    const onLoginClicked = () => {

        if (!username) {
            setShowError(true);
            setErrorMessage('Username required');

            return;
        }

        if (!password) {
            setShowError(true);
            setErrorMessage('Password required');

            return;
        }

        setIsLoggingIn(true);
        AuthService.login(username, password)
            .then(() => {
                setIsLoggingIn(false);
                props.onAuthenticated();
                history.push('/');
            }).catch(() => {
                setShowError(true);
                setIsLoggingIn(false);
                setErrorMessage('Invalid credentials');
            });
    };

    const renderErrorLabel = () => {
        return showError
            ? <Typography>{errorMessage}</Typography>
            : <React.Fragment />;
    };

    const renderLoginButton = () => {
        return isLoggingIn
            ? <CircularProgress className={classes.button} />
            : <Button className={classes.button} variant="contained" color="primary" onClick={onLoginClicked}>Sign in</Button>
    };

    return (
        <Box className={classes.root}>
            <Paper className={classes.paper} elevation={8}>
                <Grid container className={classes.container} spacing={2}>
                    <Grid item>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <TextField autoFocus label="Username" type="text" onChange={onUsernameChanged} />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField label="Password" type="password" onChange={onPasswordChanged} onKeyPress={onPasswordKeyPress} />
                    </Grid>
                    <Grid item xs={12} className={classes.error}>
                        {renderErrorLabel()}
                    </Grid>
                    <Grid item xs={12} className={classes.button}>
                        {renderLoginButton()}
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 400,
            minHeight: 600,
        },
        container: {
            padding: 40,
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
        },
        paper: {
            borderRadius: 15,
        },
        button: {
            justifyContent: "center",
        },
        error: {
            color: "red",
        }
    }),
);