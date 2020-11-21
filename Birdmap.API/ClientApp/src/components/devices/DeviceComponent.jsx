import { Box, FormControlLabel, Grid, IconButton, Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { blueGrey, green, orange, red } from '@material-ui/core/colors';
import { Power, PowerOff, Refresh } from '@material-ui/icons/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { withRouter } from "react-router";
import DeviceService from '../../common/DeviceService';
import DevicesContext from '../../contexts/DevicesContext';

const styles = theme => ({
    acc_summary: {
        backgroundColor: blueGrey[50],
    },
    acc_details: {
        backgroundColor: blueGrey[100],
    },
    grid_typo: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightRegular,
    },
    grid_typo_2: {
        marginLeft: '5px',
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        color: theme.palette.text.secondary,
    },
    grid_item: {
        width: '100%',
        marginLeft: '5px',
        marginRight: '30px',
    },
    grid_item_typo: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    grid_item_typo_2: {
        marginLeft: '5px',
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        color: theme.palette.text.secondary,
    },
    icon_box: {
        marginRight: '15px',
    }
});

class DeviceComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: "",
        }
    }

    static contextType = DevicesContext;

    getColor(status) {
        if (status == "Online") {
            return { color: green[600] };
        } else if (status == "Offline") {
            return { color: blueGrey[500] };
        } else /* if (device.status == "Unknown" || device.status == "Error") */ {
            return { color: red[800] };
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.setState({ expanded: id });
    }

    renderSensorButtons(device, sensor) {
        var service = new DeviceService();
        return this.renderButtons(
            () => service.onlinesensor(device.id, sensor.id),
            () => service.offlinesensor(device.id, sensor.id),
            () => this.context.updateDevice(device.id)
        );
    }

    renderDeviceButtons(device) {
        var service = new DeviceService();
        return this.renderButtons(
            () => service.onlinedevice(device.id),
            () => service.offlinedevice(device.id),
            () => this.context.updateDevice(device.id)
        );
    }

    renderButtons(onPower, onPowerOff, onRefresh) {
        const renderOnOff = () => {
            return (
                <React.Fragment>
                    <IconButton color="primary" onClick={onPower}>
                        <Power />
                    </IconButton>
                    <IconButton color="primary" onClick={onPowerOff}>
                        <PowerOff />
                    </IconButton>
                </React.Fragment>
            );
        }

        const { classes } = this.props;
        return (
        <Box className={classes.icon_box}>
                {this.props.isAdmin ? renderOnOff() : null}
                <IconButton color="primary" onClick={onRefresh}>
                    <Refresh />
                </IconButton>
            </Box>
        );
    }

    render() {
        const { classes } = this.props;
        const Sensors = this.props.device.sensors.map((sensor, index) => (
            <Grid item className={classes.grid_item} key={sensor.id}>
                <Grid container
                    spacing={3}
                    direction="row"
                    justify="space-between"
                    alignItems="center">
                    <Grid item>
                        <Typography className={classes.grid_item_typo}>Sensor {index}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.grid_item_typo_2}>{sensor.id}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography style={this.getColor(sensor.status)}>Status: <b>{sensor.status}</b></Typography>
                    </Grid>
                    <Grid item>
                        {this.renderSensorButtons(this.props.device, sensor)}
                    </Grid>
                </Grid>
            </Grid>
        ));

        const handleChange = (panel) => (event, isExpanded) => {
            this.setState({ expanded: isExpanded ? panel : "" });
        };

        return (
            <Accordion expanded={this.state.expanded === this.props.device.id} onChange={handleChange(this.props.device.id)}>
                <AccordionSummary className={classes.acc_summary}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={"device-panel-/" + this.props.device.id}
                    id={"device-panel-/" + this.props.device.id}>
                    <Grid container
                        spacing={3}
                        direction="row"
                        justify="space-between"
                        alignItems="center">
                        <Grid item>
                            <Typography className={classes.grid_typo}>Device {this.props.index}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.grid_typo_2}>{this.props.device.id}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography style={this.getColor(this.props.device.status)}>Status: <b>{this.props.device.status}</b></Typography>
                        </Grid>
                        <Grid item>
                            <FormControlLabel
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                                control={this.renderDeviceButtons(this.props.device)}/>
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails className={classes.acc_details}>
                    <Grid className={classes.grid_item}
                        container
                        spacing={3}
                        direction="column"
                        justify="center"
                        alignItems="flex-start">
                        {Sensors}
                    </Grid>
                </AccordionDetails>
            </Accordion>
        );
    }
}

export default withRouter(withStyles(styles)(DeviceComponent));