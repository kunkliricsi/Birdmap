﻿import Context from './DevicesContext'
import { HubConnectionBuilder } from '@microsoft/signalr';
import DeviceService from '../common/DeviceService';
import C from '../common/Constants'
import React, { Component } from 'react'

const hub_url = '/hubs/devices';

export default class DevicesContextProvider extends Component {
    constructor(props) {
        super(props);

        const handlers = {};
        for (var property in C) {
            handlers[property] = [];
        };

        this.state = {
            hubConnection: null,
            devices: [],
            heatmapPoints: [],
            handlers: handlers,
        };
    }

    addHandler = (methodName, handler) => {
        const updatedHandlers = [...this.state.handlers];
        updatedHandlers[methodName].push(handler);
        this.setState({ handlers: updatedHandlers });
    }

    removeHandler = (methodName, handler) => {
        const updatedHandlers = [...this.state.handlers];
        var index = updatedHandlers[methodName].findIndex((h => h === handler));
        if (index > 0) {
            delete updatedHandlers[index];
        }
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

                newConnection.on(C.probability_method_name, (id, date, prob) => {
                    //console.log(method_name + " recieved: [id: " + id + ", date: " + date + ", prob: " + prob + "]");
                    var device = this.state.devices.filter(function (x) { return x.id === id })[0]
                    var newPoint = { lat: device.coordinates.latitude, lng: device.coordinates.longitude, prob: prob, date: date };
                    this.setState({
                        heatmapPoints: [...this.state.heatmapPoints, newPoint]
                    });

                    this.invokeHandlers(C.probability_method_name, newPoint);
                });

                newConnection.on(C.update_all_method_name, () => {
                    this.handleAllDevicesUpdated(service);
                    this.invokeHandlers(C.update_all_method_name, null);
                });

                newConnection.on(C.update_method_name, (id) => {
                    service.getdevice(id).then(result => {
                        const updatedDevices = [...this.state.devices];
                        var index = updatedDevices.findIndex((d => d.id == id));
                        if (index > 0) {
                            updatedDevices[index] = result;
                        }
                        else {
                            updatedDevices.push(result);
                        }
                        this.setState({ devices: updatedDevices });
                        this.invokeHandlers(C.update_method_name, result);
                    }).catch(ex => console.log("Device update failed.", ex));
                })
            }).catch(e => console.log('Hub Connection failed: ', e));
    }

    componentWillUnmount() {
        if (this.state.hubConnection != null) {
            this.state.hubConnection.off(C.probability_method_name);
            this.state.hubConnection.off(C.update_all_method_name);
            this.state.hubConnection.off(C.update_method_name);
            console.log('Hub Disconnected!');
        }
    }

    render() {
        return (
            <Context.Provider
                value={{
                    devices: this.state.devices,
                    heatmapPoints: this.state.heatmapPoints,

                    addHandler: this.addHandler
                }}
            >
                {this.props.children}
                </Context.Provider>
            );
    };
}