import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Services from './services/Services';

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: '64px',
        backgroundColor: theme.palette.primary.dark,
    }
});

class Dashboard extends Component {
    render() {
        <Box className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Services isAdmin={this.props.isAdmin}/>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper} />
                    <Paper className={classes.paper} />
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper} />
                </Grid>
            </Grid>
        </Box>
    }
}

export default withStyles(styles)(Dashboard);