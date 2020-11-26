import { ClickAwayListener, Container, createStyles, Grow, IconButton, makeStyles, MenuItem, MenuList, Paper, Popper, Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import BirdmapTitle from './BirdmapTitle';

export default function BirdmapBar(props: { onLogout: () => void; isAuthenticated: any; isAdmin: any; }) {
    const classes = useAppbarStyles();
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

        props.onLogout();
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
        return props.isAuthenticated
            ? <Container className={classes.nav_menu}>
                <NavLink exact to="/" className={classes.nav_menu_item} activeClassName={classes.nav_menu_item_active}>Dashboard</NavLink>
                {props.isAdmin ? <NavLink exact to="/logs" className={classes.nav_menu_item} activeClassName={classes.nav_menu_item_active}>Logs</NavLink> : null}
                <NavLink to="/devices" className={classes.nav_menu_item} activeClassName={classes.nav_menu_item_active}>Devices</NavLink>
                <NavLink exact to="/heatmap" className={classes.nav_menu_item} activeClassName={classes.nav_menu_item_active}>Heatmap</NavLink>
                <IconButton className={classes.nav_menu_icon}
                    ref={anchorRef}
                    aria-haspopup="true"
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-label="account of current user"
                    onClick={handleToggle}>
                    <AccountCircle />
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
        <AppBar position="static">
            <Toolbar>
                <BirdmapTitle />
                <Typography component={'span'} className={classes.typo}>
                    {renderNavLinks()}
                </Typography>
            </Toolbar>
        </AppBar>
    )
};


const useAppbarStyles = makeStyles((theme: Theme) =>
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
