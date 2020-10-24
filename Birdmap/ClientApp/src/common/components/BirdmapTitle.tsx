import { Box, Typography } from '@material-ui/core';
import { BrowserRouter, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

export default function BirdmapTitle(props: any) {
    const classes = useStyles();

    return (
        <Box component="span" className={classes.root}>
            <Typography component="span" className={classes.bird}>
                <NavLink exact to="/" className={classes.nav_menu_item} activeClassName={classes.nav_menu_item_active}>
                    Bird
                </NavLink>
            </Typography>
            <Typography component="span" className={classes.map}>
                <NavLink exact to="/heatmap" className={classes.nav_menu_item} activeClassName={classes.nav_menu_item_active}>
                    map
                </NavLink>
            </Typography>
        </Box>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'inline',
        },
        bird: {
            textAlign: "left",
            fontWeight: 1000,
            fontSize: 30,
            textShadow: '3px 3px 0px rgba(0,0,0,0.2)',
        },
        map: {
            textAlign: "left",
            fontWeight: 100,
            fontSize: 26,
            textShadow: '2px 2px 0px rgba(0,0,0,0.2)',
        },
        nav_menu_item: {
            textDecoration: 'none',
            color: 'white',
            '&:hover': {
                textDecoration: 'underline',
                color: 'white',
            }
        },
        nav_menu_item_active: {
            textDecoration: 'none',
            color: 'white',
            '&:hover': {
                textDecoration: 'underline',
                color: 'white',
            }
        },
    }),
);