import { Box } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import DevicesContext from '../../contexts/DevicesContext';
import DeviceComponent from './DeviceComponent';

const styles = theme => ({
    root: {
        padding: '64px',
        backgroundColor: theme.palette.primary.dark,
    }
});

class Devices extends React.Component {
    constructor(props) {
        super(props);
    }

    static contextType = DevicesContext;

    componentDidMount() {
    }

    render() {
        const { classes } = this.props;
        const Devices = this.context.devices.map((device, index) => (
            <DeviceComponent isAdmin={this.props.isAdmin} device={device} index={index} key={device.id}/>
        ));

        return (
            <Box className={classes.root}>
                {Devices}
            </Box>
        );
    }
}

export default withStyles(styles)(Devices);