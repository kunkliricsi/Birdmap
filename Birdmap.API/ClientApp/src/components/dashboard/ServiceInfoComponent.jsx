import { Box, FormControlLabel, Grid, IconButton, Paper, TextField, Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { blueGrey, green, red } from '@material-ui/core/colors';
import { CancelRounded, CheckCircleRounded, Delete, Edit } from '@material-ui/icons/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import DeleteDialog from './DeleteDialog';

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: '64px',
        backgroundColor: theme.palette.primary.dark,
    },
    acc_summary: {
        backgroundColor: blueGrey[50],
        padding: theme.spacing(2),
        textAlign: 'center',
        height: '75px',
    },
    acc_details: {
        backgroundColor: blueGrey[100],
    },
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
    typo: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightRegular,
    },
    icon_box: {
        marginLeft: '30px',
    },
    paper: {
        backgroundColor: blueGrey[50],
        padding: theme.spacing(2),
        textAlign: 'center',
        height: '75px',
    }
});

class ServiceInfoComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDialogOpen: false,
            isEditing: false,
            name: "",
            url: "",
        }

        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onUrlChange = this.onUrlChange.bind(this);
        this.handleSaveCancel = this.handleSaveCancel.bind(this);
    }

    componentDidMount() {
        this.setState({ name: this.props.info.service.name, url: this.props.info.service.uri });

        if (this.props.isEditing !== undefined) {
            this.setState({ isEditing: this.props.isEditing });
        }
    }

    onNameChange(event) {
        this.setState({ name: event.target.value });
    }

    onUrlChange(event) {
        this.setState({ url: event.target.value });
    }

    getColor(status) {
        if (status === "OK")
            return { color: green[600] };
        else
            return { color: red[600] };
    }

    handleDialogClose(result) {
        this.setState({ isDialogOpen: false });
        if (result === true) {
            this.props.service.delete(this.props.info.service.id);
        }
    }

    handleEditCancel(value) {
        this.setState({ isEditing: value });
    }

    handleSaveCancel() {
        let request = {
            ...this.props.info.service
        };

        request.name = this.state.name;
        request.uri = this.state.url;

        if (request.id > 0) {
            this.props.service.put(request).catch(ex => {
                console.log(ex);
            });
        }
        else {
            this.props.service.post(request).catch(ex => {
                console.log(ex);
            });
        }

        this.setState({ isEditing: false });
    }

    renderSaveCancel() {
        return (
            <Box styles={{ marginLeft: 'auto' }}>
                <IconButton color="primary" onClick={this.handleSaveCancel}>
                    <CheckCircleRounded fontSize="large" />
                </IconButton>
                <IconButton color="primary" onClick={() => this.setState({ isEditing: false })}>
                    <CancelRounded fontSize="large" />
                </IconButton>
            </Box>
        );
    }

    renderButtons() {
        const renderEditDelete = () => {
            return (
                <React.Fragment>
                    <DeleteDialog open={this.state.isDialogOpen} handleClose={this.handleDialogClose}/>
                    <IconButton color="primary" onClick={() => this.handleEditCancel(true)}>
                        <Edit fontSize="large"/>
                    </IconButton>
                    <IconButton style={{color: red[600]}} onClick={() => this.setState({ isDialogOpen: true })}>
                        <Delete fontSize="large"/>
                    </IconButton>
                </React.Fragment>
            );
        }

        const { classes } = this.props;
        return (
            <Box className={classes.icon_box}>
                {this.props.isAdmin && this.props.info.service.name !== "Mqtt Client Service" ? renderEditDelete() : null}
            </Box>
        );
    }

    render() {
        const { classes } = this.props;

        const renderAccordion = () => {
            return (
                <Accordion>
                    <AccordionSummary className={classes.acc_summary}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={"device-panel-/" + this.props.info.service.name}
                        id={"device-panel-/" + this.props.info.service.name}>
                        <Grid container
                            spacing={1}
                            direction="row"
                            justify="flex-start"
                            alignItems="center">
                            <Grid item>
                                <Typography className={classes.grid_typo}>{this.props.info.service.name}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography className={classes.grid_typo_2}>{this.props.info.service.uri}</Typography>
                            </Grid>
                            <Grid item style={{ marginLeft: 'auto' }}>
                                <Grid container
                                    spacing={1}
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="center">
                                    <Grid item>
                                        <FormControlLabel
                                            onClick={(event) => event.stopPropagation()}
                                            onFocus={(event) => event.stopPropagation()}
                                            control={this.renderButtons()} />
                                    </Grid>
                                    <Grid item>
                                        <Typography style={this.getColor(this.props.info.statusCode)}>Status: <b>{this.props.info.statusCode}</b></Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails className={classes.acc_details}>
                        {this.props.info.response}
                    </AccordionDetails>
                </Accordion>
            );
        };

        const renderTextFields = () => {
            return (
                <Paper className={classes.acc_summary}>
                    <Grid container
                        spacing={1}
                        direction="row"
                        justify="flex-start"
                        alignItems="center">
                        <Grid item xs>
                            <TextField label="Name" type="text" defaultValue={this.props.info.service.name} onChange={this.onNameChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Url" type="text" fullWidth defaultValue={this.props.info.service.uri} onChange={this.onUrlChange}/>
                        </Grid>
                        <Grid item xs>
                            {this.renderSaveCancel()}
                        </Grid>
                    </Grid>
                </Paper>
                );
        };

        return this.state.isEditing ? renderTextFields() : renderAccordion();
    }
}

export default withStyles(styles)(ServiceInfoComponent);