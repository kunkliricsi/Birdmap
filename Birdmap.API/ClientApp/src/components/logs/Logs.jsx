import { Button, Checkbox, List, ListItem, ListItemIcon, ListItemText, Paper } from '@material-ui/core';
import React, { Component } from 'react';
import LogService from './LogService';

export class Logs extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            service: null,
            files: [],
            checked: [],
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

    downloadChecked = () => {
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
        })
        .catch(ex => console.log(ex));
    }

    render() {
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
            <Paper>
                <List >
                    {Files}
                </List>
                <Button onClick={this.downloadChecked}>
                    Download
                </Button>
            </Paper>
        )
    }
}

export default Logs
