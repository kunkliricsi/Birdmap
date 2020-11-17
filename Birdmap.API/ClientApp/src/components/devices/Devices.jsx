import React, { Component } from 'react'
import DeviceService from './DeviceService'
import Accordion from '@material-ui/core/Accordion';
import DeviceComponent from './DeviceComponent'
import SensorComponent from './DeviceComponent'
import { withStyles } from '@material-ui/styles';
import { Box } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

const styles = theme => ({
    root: {
        padding: '64px',
        color: theme.palette.primary.main,
    }
});

class Devices extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            devices: [],
        };
    }

    componentDidMount() {
        new DeviceService().getall().then(result => {
            this.setState({ devices: result });
        }).catch(ex => {
            console.log(ex);
        });
    }

    render() {
        const { classes } = this.props;
        const Devices = this.state.devices.map((device, index) => (
            <DeviceComponent device={device} index={index} key={device.id}/>
        ));

        return (
            <Box className={classes.root}>
                {Devices}
            </Box>
        );
    }
}

export default withStyles(styles)(Devices);