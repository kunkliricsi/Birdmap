/*global google*/
import GoogleMapReact from 'google-map-react';
import React, { Component } from 'react';
import DevicesService, { DeviceService } from '../devices/DeviceService'
import { HubConnectionBuilder } from '@microsoft/signalr';

const hub_url = '/hubs/devices';
const method_name = 'NotifyDeviceAsync';

export default class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            devices: [],
            center: {
                lat: 48.275939, lng: 21.469640
            },
            points: [],
            heatmapPoints: [],
            connection: null,
        }
    }

    componentDidMount() {
        const service = new DeviceService();
        service.getall().then(result => {
            this.setState({ devices: result })
        }).catch(ex => {
            console.log(ex)
        });

        const newConnection = new HubConnectionBuilder()
            .withUrl(hub_url)
            .withAutomaticReconnect()
            .build();

        this.setState({ connection: newConnection });

        newConnection.start()
            .then(result => {
                console.log('Hub Connected!');

                newConnection.on(method_name, (id, date, prob) => {
                    this.state.points.push({ id, date, prob });
                    //console.log(method_name + " recieved: [id: " + id + ", date: " + date + ", prob: " + prob + "]");
                    if (prob > 0.5) {
                        var device = this.state.devices.filter(function (x) { return x.id === id })[0]
                        var newPoint = { lat: device.coordinates.latitude, lng: device.coordinates.longitude };
                        this.setState({
                            heatmapPoints: [...this.state.heatmapPoints, newPoint ]
                        });

                        if (this._googleMap !== undefined) {
                            const point = { location: new google.maps.LatLng(newPoint.lat, newPoint.lng), weight: prob };
                            this._googleMap.heatmap.data.push(point)
                        }
                    }
                });
            })
            .catch(e => console.log('Hub Connection failed: ', e));
    }

    componentWillUnmount() {
        if (this.state.connection) {
            this.state.connection.off(method_name);
        }
    }

    render() {
        const heatMapData = {
            positions: this.state.heatmapPoints,
            options: {
                radius: 50,
                opacity: 0.6,
            }
        }

        const mapOptions = {
            overviewMapControl: true,
            mapTypeId: 'terrain'
        }

        return (
            <div style={{ height: '91vh', width: '100%' }}>
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
                </GoogleMapReact>
            </div>
        );
    }
}