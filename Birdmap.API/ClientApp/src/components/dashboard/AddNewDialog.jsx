import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState } from 'react';

export default function AddNewDialog(props) {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");

    const onNameChange = (event) => {
        setName(event.target.value);
    }

    const onUrlChange = (event) => {
        setUrl(event.target.value);
    }

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Add new service."}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        onChange={onNameChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="url"
                        label="Url"
                        type="text"
                        onChange={onUrlChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => props.handleAdd(name, url)} color="primary" autoFocus>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
