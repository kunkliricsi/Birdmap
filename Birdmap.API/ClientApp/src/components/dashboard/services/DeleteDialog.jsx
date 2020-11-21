import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';

export default function DeleteDialog(props) {
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={() => props.handleClose(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting is permament.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.handleClose(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => props.handleClose(true)} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
