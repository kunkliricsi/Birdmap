import React, { Component } from 'react';
import AccordionDetails from '@material-ui/core/AccordionDetails';


export default class SensorComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const Sensors = this.props.device.sensors.map((sensor, index) => (
            <Typography>Sensor {this.props.index}</Typography>
        ));

        return (
            <AccordionDetails>
                {Sensors}
            </AccordionDetails>
        );
    }
}