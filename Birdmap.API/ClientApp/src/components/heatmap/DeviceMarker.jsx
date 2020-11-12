import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { shadows } from '@material-ui/system';
import { Box, Popover, Typography, Tooltip, Grid } from '@material-ui/core';
import { blue, red, yellow } from '@material-ui/core/colors';
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
            return { color: blue[800] };
        } else if (device.status == "Offline") {
            return { color: yellow[800] };
        } else /* if (device.status == "unknown") */ {
            return { color: red[800] };
        }
    }

    useStyles() {
        return makeStyles(theme => ({
            root: {
                display: 'grid'
            },
            icon: {

            }
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
            <Box className={classes.root} boxShadow={5}>
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