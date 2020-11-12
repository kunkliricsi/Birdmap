/*global google*/
import GoogleMapReact from 'google-map-react';
import React, { Component } from 'react';
import DevicesService, { DeviceService } from '../devices/DeviceService'
import DeviceMarker from './DeviceMarker'
import { HubConnectionBuilder } from '@microsoft/signalr';

const hub_url = '/hubs/devices';
const probability_method_name = 'NotifyDeviceAsync';
const update_method_name = 'NotifyDeviceUpdatedAsync';
const update_all_method_name = 'NotifyAllUpdatedAsync';
const lat_offset = 0.000038;
const lng_offset = -0.000058;
const heatmapPoints_session_name = 'heatmapPoints';

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

    handleAllDevicesUpdated(service = null) {
        if (service === null) {
            service = new DevicesService();
        }
        service.getall().then(result => {
            this.setState({ devices: result });
        }).catch(ex => {
            console.log(ex);
        });
    }

    componentDidMount() {
        const service = new DeviceService();
        this.handleAllDevicesUpdated(service);

        const newConnection = new HubConnectionBuilder()
            .withUrl(hub_url)
            .withAutomaticReconnect()
            .build();

        this.setState({ connection: newConnection });

        newConnection.start()
            .then(result => {
                console.log('Hub Connected!');

                newConnection.on(probability_method_name, (id, date, prob) => {
                    this.state.points.push({ id, date, prob });
                    //console.log(method_name + " recieved: [id: " + id + ", date: " + date + ", prob: " + prob + "]");
                    if (prob > 0.5) {
                        var device = this.state.devices.filter(function (x) { return x.id === id })[0]
                        var newPoint = { lat: device.coordinates.latitude, lng: device.coordinates.longitude };
                        this.setState({
                            heatmapPoints: [...this.state.heatmapPoints, newPoint]
                        });

                        if (this._googleMap !== undefined) {
                            const point = { location: new google.maps.LatLng(newPoint.lat, newPoint.lng), weight: prob };
                            this._googleMap.heatmap.data.push(point)
                        }
                    }
                });

                newConnection.on(update_all_method_name, () => {
                    this.handleAllDevicesUpdated(service);
                });

                newConnection.on(update_method_name, (id) => {
                    service.getdevice(id).then(result => {
                        var index = this.state.devices.findIndex((d => d.id == id));
                        const newDevices = [...this.state.devices];
                        newDevices[index] = result;
                        this.setState({ devices: newDevices });
                    }).catch(ex => console.log("Device update failed.", ex));
                })
            }).catch(e => console.log('Hub Connection failed: ', e));
    }

    componentWillUnmount() {
        if (this.state.connection) {
            this.state.connection.off(probability_method_name);
            this.state.connection.off(update_all_method_name);
            this.state.connection.off(update_method_name);
            console.log('Hub Disconnected!');
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
            disableDefaultUI: true,
            zoomControl: true,
            mapTypeControl: true,
            overviewMapControl: true,
            streetViewControl: false,
            scaleControl: true,
            mapTypeId: 'satellite'
        }

        const Markers = this.state.devices.map((device, index) => (
            <DeviceMarker
                key={device.id}
                lat={device.coordinates.latitude + lat_offset}
                lng={device.coordinates.longitude + lng_offset}
                device={device}
            />
        ));

        return (
            <div style={{ height: '93.5vh', width: '100%' }}>
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
            </div>
        );
    }
}