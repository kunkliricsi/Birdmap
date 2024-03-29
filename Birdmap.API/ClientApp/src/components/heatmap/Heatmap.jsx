﻿/*global google*/
import { Box, withStyles } from '@material-ui/core';
import GoogleMapReact from 'google-map-react';
import React, { Component } from 'react';
import C from '../../common/Constants';
import DevicesContext from '../../contexts/DevicesContext';
import DeviceMarker from './DeviceMarker';

const lat_offset = 0.000038;
const lng_offset = -0.000058;

const styles = theme => ({
    root: { 
        height: '93vh', 
        width: '100%', 
    }
});

class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            center: {
                lat: 48.275939, lng: 21.469640
            },
            heatmapPoints: [],
        };

        this.probabilityHandler = this.probabilityHandler.bind(this);
        this.handlePoint = this.handlePoint.bind(this);
    }

    static contextType = DevicesContext;

    probabilityHandler(points) {
        for (var point of points) {
            this.handlePoint(point);
        }
    }

    handlePoint(point) {
        if (point.prob > 0.5) {

            this.setState({
                heatmapPoints: [...this.state.heatmapPoints, point]
            });

            if (this._googleMap !== undefined) {
                const newPoint = { location: new google.maps.LatLng(point.lat, point.lng), weight: point.prob };
                if (this._googleMap.heatmap !== null) {
                    this._googleMap.heatmap.data.push(newPoint)
                }
            }
        }
    }

    componentDidMount() {
        this.context.addHandler(C.probability_method_name, this.probabilityHandler);
        const newPoints = [];
        for (var p of this.context.heatmapPoints) {
            if (p.prob > 0.5) {
                newPoints.push(p)
            }
        }

        this.setState({ heatmapPoints: newPoints });
    }

    componentWillUnmount() {
        this.context.removeHandler(C.probability_method_name, this.probabilityHandler);
    }

    render() {
        const {classes} = this.props;

        const heatMapData = {
            positions: this.state.heatmapPoints,
            options: {
                radius: 50,
                opacity: 0.6,
            }
        }

        const mapOptions = {
            disableDefaultUI: true,
            zoomControl: true,
            mapTypeControl: true,
            overviewMapControl: true,
            streetViewControl: false,
            scaleControl: true,
            mapTypeId: 'satellite'
        }

        const Markers = this.context.devices.map((device, index) => (
            <DeviceMarker
                key={device.id}
                lat={device.coordinates.latitude + lat_offset}
                lng={device.coordinates.longitude + lng_offset}
                device={device}
            />
        ));

        return (
            <Box className={classes.root}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: ["AIzaSyCZ51VFfxqZ2GkCmVrcNZdUKsM0fuBQUCY"],
                        libraries: ['visualization']
                    }}
                    ref={(el) => this._googleMap = el}
                    options={mapOptions}
                    defaultZoom={18}
                    heatmapLibrary={true}
                    heatmap={heatMapData}
                    defaultCenter={this.state.center}>
                    {Markers}
                </GoogleMapReact>
            </Box>
        );
    }
}

export default withStyles(styles)(MapContainer);