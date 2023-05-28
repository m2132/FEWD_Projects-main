import { Divider, LinearProgress, Card, Typography, CardContent } from "@material-ui/core";
import { useEffect, useState } from "react";
import Registration from '../localStorage';
import React from 'react';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import { useStyles } from './styles';



export default function Info() {

    const [user, setUser] = useState();
    const userId = Registration.getUserId();

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then(response => response.json())
            .then(data => setUser(data));
    }, [userId])

    const classes = useStyles();

    return (
        <div>
            {!user ? <LinearProgress />
                : (
                    <Card className={classes.root}>
                        <CardContent>
                            <ProfileIcon className={classes.icon} />
                            <div className={classes.details}>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    {user.website}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    {user.name}
                                </Typography>
                                <Divider /><br />
                                <Typography variant="h4" component="h2">
                                    User Info
                                </Typography>
                        
                                <br />
                                <Typography variant="h6" color="primary">Address</Typography>
                                <Typography paragraph>
                                    <Typography variant="subtitle2" color="textSecondary">street</Typography> {user.address.street}<br />
                                    <Typography variant="subtitle2" color="textSecondary">city</Typography> {user.address.city}<br />
                                </Typography>

                                <br />
                                <Typography variant="h6" color="primary">Concat</Typography>
                                <Typography paragraph>
                                    <Typography variant="subtitle2" color="textSecondary">email</Typography> {user.email}<br />
                                    <Typography variant="subtitle2" color="textSecondary">phone</Typography> {user.phone.split(' ')[0]}<br />
                                </Typography>

                                <br />
                                <Typography variant="h6" color="primary">Company</Typography>
                                <Typography paragraph>
                                    <Typography variant="subtitle2" color="textSecondary">name</Typography> {user.company.name}<br />
                                    <Typography variant="subtitle2" color="textSecondary">Catch phrase</Typography> {user.company.catchPhrase}<br />
                                    <Typography variant="subtitle2" color="textSecondary">BS</Typography> {user.company.bs}<br />
                                </Typography>

                                
                            </div>
                        </CardContent>
                    </Card>
                )}
        </div>
    )
}