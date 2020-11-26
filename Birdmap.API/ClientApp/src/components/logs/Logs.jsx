import { Box, Button, Checkbox, List, ListItem, ListItemIcon, ListItemText, Paper, withStyles } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import React, { Component } from 'react';
import LogService from './LogService';

const styles = theme => ({
    root: {
        padding: '64px',
        backgroundColor: theme.palette.primary.dark,
    },
    paper: {
        backgroundColor: blueGrey[50],
    },
});

class Logs extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            service: null,
            files: [],
            checked: [],
            selectAllChecked: false,
        }
    }
    
    componentDidMount() {
        var service = new LogService();
        this.setState({service: service});

        service.getAll().then(result => {
            this.setState({files: result});
        }).catch(ex => console.log(ex));
    }

    handleToggle = (value) => {
        const currentIndex = this.state.checked.indexOf(value);
        const newChecked = [...this.state.checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }

        this.setState({checked: newChecked});
    }

    handleSelectAllToggle = () => {
        this.setState({selectAllChecked: !this.state.selectAllChecked});
        if (this.state.selectAllChecked) {
            this.setState({checked: []});
        } else {
            const newChecked = [...this.state.files];
            this.setState({checked: newChecked});
        }

    }

    onDownload = () => {
        this.state.service.getFiles(this.state.checked)
        .then(result => {
            const filename = `Logs-${new Date().toISOString()}.zip`;
            const textUrl = URL.createObjectURL(result.data);
            const element = document.createElement('a');
            element.setAttribute('href', textUrl);
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            this.setState({checked: []});
            this.setState({selectAllChecked: false});
        })
        .catch(ex => console.log(ex));
    }

    render() {
        const { classes } = this.props;

        const Files = this.state.files.map((value) => {
            const labelId = `checkbox-list-label-${value}`;
    
            return (
            <ListItem key={value} role={undefined} dense button onClick={() => this.handleToggle(value)}>
                <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={this.state.checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${value}`} />
            </ListItem>
            );
        })

        return (
            <Box className={classes.root}>
                <Paper className={classes.paper}>
                    <List className={classes.paper}>
                        <ListItem key="Select-all" role={undefined} dense button onClick={this.handleSelectAllToggle}>
                            <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={this.state.selectAllChecked}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': "Select-all" }}
                            />
                            </ListItemIcon>
                            <ListItemText id="checkbox-list-label-Select-all" primary={(this.state.selectAllChecked ? "Uns" : "S") + "elect all"} />
                        </ListItem>
                        {Files}
                    </List>
                    <Button onClick={this.onDownload}>
                        Download
                    </Button>
                </Paper>
            </Box>
        )
    }
}

export default withStyles(styles)(Logs);
