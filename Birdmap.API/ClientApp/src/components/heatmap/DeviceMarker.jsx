import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import { shadows } from '@material-ui/system';
import { Box, Popover, Typography, Tooltip } from '@material-ui/core';
import { green, red, yellow } from '@material-ui/core/colors';
import React, { Component } from 'react';
import { useHistory, withRouter  } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

class DeviceMarker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AnchorEl: null
        }
    }

    getColor() {
        const { device } = this.props;
        if (device.status == "Online") {
            return { color: green[500] };
        } else if (device.status == "Offline") {
            return { color: red[500] };
        } else /* if (device.status == "unknown") */ {
            return { color: yellow[500] };
        }
    }

    useStyles() {
        return makeStyles(theme => ({
            root: {
            },
            popover: {
                pointerEvents: 'none',
                zIndex: 1000000
            },
            paper: {
                padding: theme.spacing(1),
            },
        }));
    }

    render() {
        const classes = this.useStyles(this.props);
        const { device } = this.props;

        const onClick = () => {
            this.props.history.push('/devices/' + device.id)
        };

        const open = Boolean(this.state.AnchorEl);

        return (
            <Box>
                <Tooltip title={<div>ID: {device.id}<br />Status: {device.status}</div>} placement="top" leaveDelay={200} arrow>
                    <RadioButtonCheckedIcon fontSize="small" style={this.getColor()}
                        onClick={onClick}>
                    </RadioButtonCheckedIcon>
                </Tooltip>
            </Box>
        );
    }
}

export default withRouter(DeviceMarker);