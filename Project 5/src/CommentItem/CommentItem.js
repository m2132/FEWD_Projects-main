import React from 'react';
import { Card, Typography, CardContent } from '@material-ui/core';
import ProfileIcon from '@material-ui/icons/AccountCircle';

import { useStyles } from './styles';

export default function CommentItem({ name, email, body }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <ProfileIcon className={classes.icon} />
                <div className={classes.details}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {email}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {name}
                    </Typography>
                </div>
                <Typography variant="body2" component="p">
                    {body}
                </Typography>
            </CardContent>
        </Card>
    );
}