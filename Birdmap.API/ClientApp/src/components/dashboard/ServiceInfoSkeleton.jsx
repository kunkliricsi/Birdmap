import { Grid, Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { blueGrey } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Skeleton } from '@material-ui/lab';
import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';

const styles = theme => ({
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
});

class ServiceInfoSkeleton extends Component {

    render() {
        const { classes } = this.props;

        return (
            <Accordion>
                <AccordionSummary className={classes.acc_summary}
                    expandIcon={<ExpandMoreIcon />}>
                    <Grid container
                        spacing={1}
                        direction="row"
                        justify="flex-start"
                        alignItems="center">
                        <Grid item>
                            <Typography className={classes.grid_typo}><Skeleton width={200} /></Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.grid_typo_2}><Skeleton width={300} /></Typography>
                        </Grid>
                        <Grid item style={{ marginLeft: 'auto' }}>
                            <Grid container
                                spacing={1}
                                direction="row"
                                justify="flex-start"
                                alignItems="center">
                                <Grid item>
                                    <Typography><Skeleton width={150} /></Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails className={classes.acc_details}>
                    <Grid container
                        spacing={1}
                        direction="column"
                        justify="flex-start"
                        alignItems="flex-start">
                        <Grid item>
                            <Typography><Skeleton width={800} /></Typography>
                        </Grid>
                        <Grid item>
                            <Typography><Skeleton width={300} /></Typography>
                        </Grid>
                        <Grid item>
                            <Typography><Skeleton width={500} /></Typography>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        );
    }
}

export default withStyles(styles)(ServiceInfoSkeleton);