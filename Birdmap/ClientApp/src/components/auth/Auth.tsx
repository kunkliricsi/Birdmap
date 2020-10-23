import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Grid, TextField, Button, Typography, Paper } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AuthService from './AuthService';

export default function MenuItem(props: any) {
    const history = useHistory();
    const classes = useStyles();

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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

        AuthService.login(username, password).then(() => {
            props.onAuthenticated();
            history.push('/');

        }).catch(() => {
            setShowError(true);
            setErrorMessage('Invalid credentials');
        });
    };

    const renderErrorLabel = () => {
        return showError
            ? <Typography>{errorMessage}</Typography>
            : <React.Fragment />;
    };

    return (
        <Box className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container className={classes.container} spacing={2}>
                    <Grid item>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <TextField label="Username" type="text" onChange={onUsernameChanged} />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField label="Password" type="password" onChange={onPasswordChanged} onKeyPress={onPasswordKeyPress} />
                    </Grid>
                    <Grid item xs={12} className={classes.error}>
                        {renderErrorLabel()}
                    </Grid>
                    <Grid item xs={12} className={classes.button}>
                        <Button className={classes.button} variant="contained" color="primary" onClick={onLoginClicked}>Login</Button>
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
        },
        button: {
            width: '100%',
        },
        error: {
            color: "red",
        }
    }),
);