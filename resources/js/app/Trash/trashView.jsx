import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 180,
        minWidth: 180,
        margin: 10,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        marginTop: 10,

    },

}));

export default function TrashView(props) {

    const classes = useStyles();

    const { trashes } = props;

    if (trashes !== null) {
        console.log(trashes)
        return (
            <div className="trashes-list">
                {
                    trashes.trashes.map(trash => (

                        <Card key={trash.id} variant="outlined" className={classes.root}>

                            <Avatar alt="Trash picture" className={classes.large} src={'/storage/users-images/' + trash.image} />

                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {trash.location}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {trash.type}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                }
            </div>
        )
    } else {
        return ('No trashes')
    }
}