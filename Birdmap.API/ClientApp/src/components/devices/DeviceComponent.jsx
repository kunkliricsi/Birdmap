import React, { Component } from 'react';
import Accordion from '@material-ui/core/Accordion';
import { blue, red, yellow } from '@material-ui/core/colors';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid, Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
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
    }
});

class DeviceComponent extends Component {
    constructor(props) {
        super(props);
    }

    getColor(status) {
        if (status == "Online") {
            return { color: blue[800] };
        } else if (status == "Offline") {
            return { color: yellow[800] };
        } else /* if (device.status == "unknown") */ {
            return { color: red[800] };
        }
    }

    render() {
        const { classes } = this.props;
        const Sensors = this.props.device.sensors.map((sensor, index) => (
            <Grid item className={classes.grid_item} key={sensor.id}>
                <Typography className={classes.grid_item_typo}>Sensor {index}</Typography>
                <Typography className={classes.grid_item_typo_2}>S{sensor.id}</Typography>
            </Grid>
        ));

        return (
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={"device-panel-/" + this.props.device.id}
                    id={"device-panel-/" + this.props.device.id}>
                    <Typography className={classes.grid_typo}>Device {this.props.index}</Typography>
                    <Typography className={classes.grid_typo_2}>{this.props.device.id}</Typography>
                </AccordionSummary>
                    <AccordionDetails>
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

export default withStyles(styles)(DeviceComponent);