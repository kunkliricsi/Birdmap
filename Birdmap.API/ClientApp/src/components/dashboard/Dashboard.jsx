﻿import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Services from './services/Services';
import { blueGrey } from '@material-ui/core/colors';
import { Box, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import DonutChart from './charts/DonutChart';
import HeatmapChart from './charts/HeatmapChart';
import BarChart from './charts/BarChart';
import LineChart from './charts/LineChart';
import DevicesContext from '../../contexts/DevicesContext';
import C from '../../common/Constants';

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: '64px',
        backgroundColor: theme.palette.primary.dark,
    },
    typo: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightRegular,
    },
    paper: {
        backgroundColor: blueGrey[50],
        padding: '16px',
    }
});

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deviceSeries: [],
            sensorSeries: [],
            heatmapSecondsSeries: [],
            heatmapMinutesSeries: [],
            barSeries: [],
            barCategories: [],
            lineSeries: [],
        };

        this.updateSeries = this.updateSeries.bind(this);
        this.updateDynamic = this.updateDynamic.bind(this);
    }

    static contextType = DevicesContext;

    getItemsWithStatus(iterate, status) {
        const items = [];

        for (var d of iterate) {
            if (d.status == status) {
                items.push(d);
            }
        }

        return items;
    }

    getDevicesWithStatus(status) {
        return this.getItemsWithStatus(this.context.devices, status);
    }

    getSensorsWithStatus(status) {
        const sensors = [];

        for (var d of this.context.devices) {
            sensors.push(...d.sensors)
        }

        return this.getItemsWithStatus(sensors, status);
    }

    getDeviceSeries() {
        var online = this.getDevicesWithStatus("Online").length;
        var offline = this.getDevicesWithStatus("Offline").length;
        var error = this.getDevicesWithStatus("Error").length;

        return [online, offline, error]
    }

    getSensorSeries() {
        var online = this.getSensorsWithStatus("Online").length;
        var offline = this.getSensorsWithStatus("Offline").length;
        var unknown = this.getSensorsWithStatus("Unknown").length;

        return [online, offline, unknown]
    }

    updateSeries() {
        this.setState({
            deviceSeries: this.getDeviceSeries(),
            sensorSeries: this.getSensorSeries(),
            heatmapSecondsSeries: this.getHeatmapSecondsSeries(),
            heatmapMinutesSeries: this.getHeatmapMinutesSeries(),
            barSeries: this.getBarSeries(),
            barCategories: this.getBarCategories(),
            lineSeries: this.getLineSeries(),
        });
    }

    updateDynamic() {
        this.setState({
            heatmapSecondsSeries: this.getHeatmapSecondsSeries(),
            heatmapMinutesSeries: this.getHeatmapMinutesSeries(),
            barSeries: this.getBarSeries(),
            barCategories: this.getBarCategories(),
            lineSeries: this.getLineSeries(),
        });
    }

    componentDidMount() {
        this.context.addHandler(C.update_all_method_name, this.updateSeries);
        this.context.addHandler(C.update_method_name, this.updateSeries);
        this.updateSeries();
        window.setInterval(() => {
            this.updateDynamic();
        }, 1000);
    }

    componentWillUnmount() {
        this.context.removeHandler(C.update_all_method_name, this.updateSeries);
        this.context.removeHandler(C.update_method_name, this.updateSeries);
    }

    getHeatmapSecondsSeries() {
        const minuteAgo = new Date( Date.now() - 1000 * 60 );

        const devicePoints = {};

        for (var d of this.context.devices) {
            devicePoints[d.id] = Array(60).fill(0);
        }

        for (var p of this.context.heatmapPoints) {
            if (p.date > minuteAgo) {
                var seconds = Math.floor((p.date.getTime() - minuteAgo.getTime()) / 1000);
                var oldProb = devicePoints[p.deviceId][seconds];
                if (oldProb < p.prob) {
                    devicePoints[p.deviceId][seconds] = p.prob;
                }
            }
        }

        const series = [];

        var i = 0;
        for (var p in devicePoints) {
            series.push({
                name: "Device " + i,
                data: devicePoints[p].map((value, index) => ({
                    x: new Date( Date.now() - (60 - index) * 1000 ).toLocaleTimeString('hu-HU'),
                    y: value
                })),
            });
            i++;
        };

        return series;
    }

    getHeatmapMinutesSeries() {
        const hourAgo = new Date( Date.now() - 1000 * 60 * 60 );

        const devicePoints = {};

        for (var d of this.context.devices) {
            devicePoints[d.id] = Array(60).fill(0);
        }

        for (var p of this.context.heatmapPoints) {
            if (p.date > hourAgo) {
                var minutes = Math.floor((p.date.getTime() - hourAgo.getTime()) / (1000 * 60));
                var oldProb = devicePoints[p.deviceId][minutes];
                if (oldProb < p.prob) {
                    devicePoints[p.deviceId][minutes] = p.prob;
                }
            }
        }

        const series = [];

        var i = 0;
        for (var p in devicePoints) {
            series.push({
                name: "Device " + i,
                data: devicePoints[p].map((value, index) => ({
                    x: new Date( Date.now() - (60 - index) * 1000 * 60 ).toLocaleTimeString('hu-HU').substring(0, 5),
                    y: value
                })),
            });
            i++;
        };

        return series;
    }

    getBarSeries() {
        const devicePoints = {};
        for (var d of this.context.devices) {
            devicePoints[d.id] = Array(3).fill(0);
        }
        
        for (var p of this.context.heatmapPoints) {
            if (p.prob > 0.5 && p.prob <= 0.7) {
                devicePoints[p.deviceId][0] += 1;
            }
            if (p.prob > 0.7 && p.prob <= 0.9) {
                devicePoints[p.deviceId][1] += 1;
            }
            if (p.prob > 0.9) {
                devicePoints[p.deviceId][2] += 1;
            }
        }
        
        const series = [];
        const getCount = column => {
            var counts = [];

            for (var p in devicePoints) {
                counts.unshift(devicePoints[p][column]);
            }

            return counts;
        };

        series.push({
            name: "Prob > 0.5",
            data: getCount(0),
        });
        series.push({
            name: "Prob > 0.7",
            data: getCount(1),
        });
        series.push({
            name: "Prob > 0.9",
            data: getCount(2),
        });

        return series;
    }

    getBarCategories() {
        const categories = [];

        for (var i = this.context.devices.length - 1; i >= 0; i--) {
            categories.push("Device " + i)
        }

        return categories;
    }

    getLineSeries() {
        const messages = {};

        for (var p of this.context.heatmapPoints) {
            var shortDate = p.date.toUTCString();
            var message = messages[shortDate];
            if (message === undefined) {
                messages[shortDate] = 1;
            } else {
                messages[shortDate] += 1;
            }
        }

        const series = [{name: "message/sec", data: []}];
        for (var m in messages) {
            series[0].data.push({
                x: new Date(m).getTime(),
                y: messages[m],
            })
        }

        return series;
    }

    render() {
        const { classes } = this.props;
        return (
            <Box className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Services isAdmin={this.props.isAdmin}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <DonutChart totalLabel="Devices" series={this.state.deviceSeries}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <DonutChart totalLabel="Sensors" series={this.state.sensorSeries}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <HeatmapChart label="Highest probability per devices by seconds" series={this.state.heatmapSecondsSeries}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <HeatmapChart label="Highest probability per devices by minutes" series={this.state.heatmapMinutesSeries}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <BarChart label="# of messages per device" series={this.state.barSeries} categories={this.state.barCategories}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <LineChart label="# of messages by second" series={this.state.lineSeries}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default withStyles(styles)(Dashboard);