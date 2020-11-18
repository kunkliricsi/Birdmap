import { Box, Paper, Typography, IconButton, Grid } from '@material-ui/core';
import { blue, blueGrey, green, orange, red, yellow } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import DeviceService from '../../common/DeviceService';
import DevicesContext from '../../contexts/DevicesContext';
import DeviceComponent from './DeviceComponent';
import { Power, PowerOff, Refresh } from '@material-ui/icons/';

const styles = theme => ({
    root: {
        padding: '64px',
        backgroundColor: theme.palette.primary.dark,
    },
    paper: {
        backgroundColor: blueGrey[50],
        height: '60px',
        margin: 'auto',
    },
    typo: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightRegular,
    },
});

class Devices extends React.Component {
    constructor(props) {
        super(props);
    }

    static contextType = DevicesContext;

    componentDidMount() {
    }

    renderButtons() {
        var service = new DeviceService();

        const renderOnOff = () => {
            return (
                <React.Fragment>
                    <IconButton color="primary" onClick={() => service.onlineall()}>
                        <Power />
                    </IconButton>
                    <IconButton color="primary" onClick={() => service.offlineall()}>
                        <PowerOff />
                    </IconButton>
                </React.Fragment>
            );
        }

        return (
            <Box>
                {this.props.isAdmin ? renderOnOff() : null}
                <IconButton color="primary" onClick={() => this.context.updateAllDevices()}>
                    <Refresh />
                </IconButton>
            </Box>
        );
    }

    render() {
        const { classes } = this.props;
        const Devices = this.context.devices.map((device, index) => (
            <DeviceComponent isAdmin={this.props.isAdmin} device={device} index={index} key={device.id}/>
        ));

        return (
            <Box className={classes.root}>
                <Paper className={classes.paper} square>
                    <Grid container
                        spacing={3}
                        direction="row"
                        justify="center"
                        alignItems="center">
                        <Grid item>
                            <Typography className={classes.typo}>All Devices</Typography>
                        </Grid>
                            {this.renderButtons()}
                        <Grid item>
                        </Grid>
                    </Grid>
                </Paper>
                {Devices}
            </Box>
        );
    }
}

export default withStyles(styles)(Devices);