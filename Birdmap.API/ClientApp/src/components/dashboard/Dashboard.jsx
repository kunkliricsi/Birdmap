import React, { Component } from 'react';
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
        this.performTask = this.performTask.bind(this);
    }

    static contextType = DevicesContext;

    componentDidMount() {
        this.context.addHandler(C.update_all_method_name, this.updateSeries);
        this.context.addHandler(C.update_method_name, this.updateSeries);
        this.updateSeries();
        this.updateDynamic();
    }

    componentWillUnmount() {
        this.context.removeHandler(C.update_all_method_name, this.updateSeries);
        this.context.removeHandler(C.update_method_name, this.updateSeries);
        if (this.updateTimer) {
            clearTimeout(this.updateTimer);
        }
    }

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
            sensorSeries: this.getSensorSeries()
        });
    }

    updateDynamic = () => {
        const secondAgo = new Date();
        secondAgo.setMilliseconds(0);
        const minuteAgo = new Date(Date.now() - 1000 * 60);
        const hourAgo = new Date(Date.now() - 1000 * 60 * 60);

        const minuteDevicePoints = {};
        const hourDevicePoints = {};
        const barDevicePoints = {};
        const linePoints = {};

        for (var d of this.context.devices) {
            minuteDevicePoints[d.id] = Array(60).fill(0);
            hourDevicePoints[d.id] = Array(60).fill(0);
            barDevicePoints[d.id] = Array(3).fill(0);
        }

        const processHeatmapItem = (items, index) => {
            const p = items[index];
            if (p.date > minuteAgo) {
                var seconds = Math.floor((p.date.getTime() - minuteAgo.getTime()) / 1000);
                var oldProb = minuteDevicePoints[p.deviceId][seconds];
                if (oldProb < p.prob) {
                    minuteDevicePoints[p.deviceId][seconds] = p.prob;
                }
            }

            if (p.date > hourAgo) {
                var minutes = Math.floor((p.date.getTime() - hourAgo.getTime()) / (1000 * 60));
                var oldProb = hourDevicePoints[p.deviceId][minutes];
                if (oldProb < p.prob) {
                    hourDevicePoints[p.deviceId][minutes] = p.prob;
                }
            }

            if (p.prob > 0.5 && p.prob <= 0.7) {
                barDevicePoints[p.deviceId][0] += 1;
            }
            if (p.prob > 0.7 && p.prob <= 0.9) {
                barDevicePoints[p.deviceId][1] += 1;
            }
            if (p.prob > 0.9) {
                barDevicePoints[p.deviceId][2] += 1;
            }

            if (p.date < secondAgo) {
                var shortDate = p.date.toUTCString();
                var point = linePoints[shortDate];
                if (point === undefined) {
                    linePoints[shortDate] = 1;
                } else {
                    linePoints[shortDate] += 1;
                }
            }
        }

        const onFinished = () => {
            const minuteHeatmapSeries = [];

            var i = 0;
            for (var p in minuteDevicePoints) {
                minuteHeatmapSeries.push({
                    name: "Device " + i,
                    data: minuteDevicePoints[p].map((value, index) => ({
                        x: new Date(Date.now() - (60 - index) * 1000).toLocaleTimeString('hu-HU'),
                        y: value
                    })),
                });
                i++;
            };

            const hourHeatmapSeries = [];

            var i = 0;
            for (var p in hourDevicePoints) {
                hourHeatmapSeries.push({
                    name: "Device " + i,
                    data: hourDevicePoints[p].map((value, index) => ({
                        x: new Date(Date.now() - (60 - index) * 1000 * 60).toLocaleTimeString('hu-HU').substring(0, 5),
                        y: value
                    })),
                });
                i++;
            };

            const barSeries = [];

            const getCount = column => {
                var counts = [];

                for (var p in barDevicePoints) {
                    counts.unshift(barDevicePoints[p][column]);
                }

                return counts;
            };

            barSeries.push({
                name: "Prob > 0.5",
                data: getCount(0),
            });
            barSeries.push({
                name: "Prob > 0.7",
                data: getCount(1),
            });
            barSeries.push({
                name: "Prob > 0.9",
                data: getCount(2),
            });

            const lineSeries = [{ name: "message/sec", data: [] }];
            for (var m in linePoints) {
                lineSeries[0].data.push({
                    x: new Date(m).getTime(),
                    y: linePoints[m],
                })
            }

            const getBarCategories = () => {
                const categories = [];

                for (var i = this.context.devices.length - 1; i >= 0; i--) {
                    categories.push("Device " + i)
                }

                return categories;
            }

            const toUpdate = [
                { heatmapSecondsSeries: minuteHeatmapSeries },
                { heatmapMinutesSeries: hourHeatmapSeries },
                { barSeries: barSeries },
                { barCategories: getBarCategories() },
                { lineSeries: lineSeries }
            ];

            //Set states must be done separately otherwise ApexChart's UI update freezes the page.
            this.performTask(toUpdate, 2, 300, (list, index) => {
                this.setState(list[index]);
            },
            () => {
                this.updateTimer = setTimeout(this.updateDynamic, 1000);
            });
        }

        this.performTask(this.context.heatmapPoints, Math.ceil(this.context.heatmapPoints.length / 50), 20,
            processHeatmapItem, onFinished);
    }

    performTask(items, numToProcess, wait, processItem, onFinished) {
        var pos = 0;
        // This is run once for every numToProcess items.
        function iteration() {
            // Calculate last position.
            var j = Math.min(pos + numToProcess, items.length);
            // Start at current position and loop to last position.
            for (var i = pos; i < j; i++) {
                processItem(items, i);
            }
            // Increment current position.
            pos += numToProcess;
            // Only continue if there are more items to process.
            if (pos < items.length)
                setTimeout(iteration, wait); // Wait 10 ms to let the UI update.
            else
                onFinished();
        }
        iteration();
    }

    render() {
        const { classes } = this.props;
        return (
            <Box className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Services isAdmin={this.props.isAdmin} />
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <DonutChart totalLabel="Devices" series={this.state.deviceSeries} />
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <DonutChart totalLabel="Sensors" series={this.state.sensorSeries} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <HeatmapChart label="Highest probability per second by devices" series={this.state.heatmapSecondsSeries} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <HeatmapChart label="Highest probability per minute by devices" series={this.state.heatmapMinutesSeries} />
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <BarChart label="# of messages by devices" series={this.state.barSeries} categories={this.state.barCategories} />
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <LineChart label="# of messages per second" series={this.state.lineSeries} />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default withStyles(styles)(Dashboard);