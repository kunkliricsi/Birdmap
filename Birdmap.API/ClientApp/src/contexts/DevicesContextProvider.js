import Context from './DevicesContext'
import { HubConnectionBuilder } from '@microsoft/signalr';
import { DeviceService } from '../components/devices/DeviceService';
import Constants from '../common/Constants'
import React, { Component } from 'react'


const hub_url = '/hubs/devices';

export default class DevicesContextProvider extends Component {
    state = {
        hubConnection: null,
        devices: [],
        heatmapPoints: [],
        handlers: {},
    };

    addPoint = point => {
        const updatedPoints = [...this.state.heatmapPoints];
        updatedPoints.push(point);
        this.setState({ heatmapPoints: updatedPoints });
    };

    addDevice = device => {
        const updatedDevices = [...this.state.devices];
        updatedDevices.push(device);
        this.setState({ devices: updatedDevices });
    };

    addHandler = (methodName, handler) => {
        const updatedHandlers = [...this.state.handlers];
        var methodHandlers = updatedHandlers[methodName];
        if (methodHandlers == null) {
            methodHandlers = [];
        };
        const updatedMethodHandlers = [...methodHandlers];
        updatedMethodHandlers.push(handler);
        updatedHandlers[methodName] = updatedMethodHandlers;
        this.setState({ handlers: updatedHandlers });
    }

    invokeHandlers(methodName, context) {
        this.state.handlers[methodName].forEach(function (handler) {
            handler(context);
        });
    }

    handleAllDevicesUpdated(service = null) {
        if (service === null) {
            service = new DeviceService();
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

        this.setState({ hubConnection: newConnection });

        newConnection.start()
            .then(_ => {
                console.log('Hub Connected!');

                newConnection.on(Constants.probability_method_name, (id, date, prob) => {
                    //console.log(method_name + " recieved: [id: " + id + ", date: " + date + ", prob: " + prob + "]");
                    if (prob > 0.5) {
                        var device = this.state.devices.filter(function (x) { return x.id === id })[0]
                        var newPoint = { lat: device.coordinates.latitude, lng: device.coordinates.longitude };
                        this.setState({
                            heatmapPoints: [...this.state.heatmapPoints, newPoint]
                        });
                    }

                    this.invokeHandlers(Constants.probability_method_name, { point: newPoint, probability: prob });
                });

                newConnection.on(Constants.update_all_method_name, () => {
                    this.handleAllDevicesUpdated(service);
                    this.invokeHandlers(Constants.update_all_method_name, null);
                });

                newConnection.on(Constants.update_method_name, (id) => {
                    service.getdevice(id).then(result => {
                        var index = this.state.devices.findIndex((d => d.id == id));
                        const newDevices = [...this.state.devices];
                        newDevices[index] = result;
                        this.setState({ devices: newDevices });
                        this.invokeHandlers(Constants.update_method_name, result);
                    }).catch(ex => console.log("Device update failed.", ex));
                })
            }).catch(e => console.log('Hub Connection failed: ', e));
    }

    componentWillUnmount() {
        if (this.state.hubConnection != null) {
            this.state.hubConnection.off(Constants.probability_method_name);
            this.state.hubConnection.off(Constants.update_all_method_name);
            this.state.hubConnection.off(Constants.update_method_name);
            console.log('Hub Disconnected!');
        }
    }

    render() {
        return (
            <Context.Provider
                value={{
                    devices: this.state.devices,
                    heatmapPoints: this.state.heatmapPoints,
                    addDevice: this.addDevice,
                    addPoint: this.addPoint,

                    addHandler: this.addHandler
                }}
            >
                {this.props.children}
                </Context.Provider>
            );
    };
}