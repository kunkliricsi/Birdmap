import { Grid, IconButton, Paper, Typography } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import { AddBox, Refresh } from '@material-ui/icons/';
import { withStyles } from '@material-ui/styles';
import { HubConnectionBuilder } from '@microsoft/signalr';
import React, { Component } from 'react';
import AddNewDialog from './AddNewDialog';
import ServiceInfoService, { ServiceRequest } from './ServiceInfoService';
import ServiceInfoComponent from './ServiceInfoComponent';
import ServiceInfoSkeleton from './ServiceInfoSkeleton';

const styles = theme => ({
    typo: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightRegular,
    },
    paper: {
        backgroundColor: blueGrey[50],
        height: '60px',
    }
});

const hub_url = "/hubs/services";
const notify_method_name = "NotifyUpdatedAsync";

class Services extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hubConnection: null,
            isDialogOpen: false,
            isLoading: false,
            service: new ServiceInfoService(),
            services: [],
            serviceCount: [1, 2, 3],
        }

        this.handleDevicesUpdated = this.handleDevicesUpdated.bind(this);
        this.addDevice = this.addDevice.bind(this);
    }

    handleDevicesUpdated() {
        this.setState({ isLoading: true });

        this.state.service.getCount().then(result => {
            const updatedCount = [];
            for (var i = 0; i < result; i++) {
                updatedCount.push(i);
            }
            this.setState({ serviceCount: updatedCount });
        }).catch(ex => {
            console.log(ex);
        });

        this.state.service.get().then(result => {
            const updatedServices = [];
            for (var s of result) {
                updatedServices.push(s);
            }
            this.setState({ services: updatedServices });
        }).catch(ex => {
            console.log(ex);
        }).finally(() => this.setState({ isLoading: false }));
    }

    componentDidMount() {
        this.handleDevicesUpdated();
        const newConnection = new HubConnectionBuilder()
            .withUrl(hub_url)
            .withAutomaticReconnect()
            .build();

        this.setState({ hubConnection: newConnection });

        newConnection.start()
            .then(_ => {
                console.log('Services hub Connected!');
                newConnection.on(notify_method_name, () => this.handleDevicesUpdated());
            }).catch(e => console.log('Services hub Connection failed: ', e));
    }

    componentWillUnmount() {
        if (this.state.hubConnection != null) {
            this.state.hubConnection.off(notify_method_name);
            console.log('Services hub Disconnected!');
        }
    }

    addDevice(name, url) {
        this.setState({ isDialogOpen: false });
        let request = new ServiceRequest();
        request.id = 0;
        request.name = name;
        request.uri = url;

        this.state.service.post(request).catch(ex => {
            console.log(ex);
        });
    }

    render() {
        const { classes } = this.props;

        const ServiceComponents = this.state.services.map((info, index) => (
            <ServiceInfoComponent key={index} isAdmin={this.props.isAdmin} info={info} service={this.state.service} />
        ));

        const Skeletons = this.state.serviceCount.map((i, index) => (
            <ServiceInfoSkeleton key={index} />
        ));

        return (
            <React.Fragment>
                <Paper className={classes.paper} square>
                    <Grid container
                        spacing={0}
                        direction="row"
                        justify="center"
                        alignItems="center">
                        <Grid item>
                            <Typography className={classes.typo}>Services</Typography>
                        </Grid>
                        <Grid item>
                            {this.props.isAdmin ?
                                <IconButton color="primary" onClick={() => this.setState({ isDialogOpen: true })}>
                                    <AddBox fontSize="large" />
                                </IconButton>
                                : null
                            }
                        </Grid>
                        <Grid item>
                            <IconButton color="primary" onClick={this.handleDevicesUpdated}>
                                <Refresh fontSize="large" />
                            </IconButton>
                        </Grid>
                        <AddNewDialog open={this.state.isDialogOpen} handleClose={() => this.setState({ isDialogOpen: false })} handleAdd={this.addDevice} />
                    </Grid>
                </Paper>
                {this.state.isLoading ? Skeletons : ServiceComponents}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Services);