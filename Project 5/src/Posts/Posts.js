import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Registration from '../localStorage';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { useStyles } from './styles';
import { LinearProgress, makeStyles } from '@material-ui/core';


export default function Posts() {

    const userId = Registration.getUserId();
    const [posts, setPosts] = useState();

    const classes = useStyles();

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then(response => response.json())
            .then(data => setPosts(data))
    }, [userId])


    return (
        <List className={classes.root}>
            {!posts ? <LinearProgress />
                : (
                    posts.map((post, index) =>
                        <>
                            <Link to={`/posts/${post.id}/${post.title.replaceAll(' ', '-')}`} className={classes.link}>
                                <ListItem key={post.id}>
                                    <ListItemText primary={post.title} />
                                </ListItem>
                            </Link>
                            {index !== posts.length - 1 && <Divider />}
                        </>
                    )
                )
            }
        </List >
    );
}
