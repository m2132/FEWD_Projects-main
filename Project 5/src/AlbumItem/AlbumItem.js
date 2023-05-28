import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom";
import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, LinearProgress, makeStyles } from "@material-ui/core";
import { useStyles } from "./styles";
import { ChevronLeft as LeftIcon, ChevronRight as RightIcon } from '@material-ui/icons';
import Albums from "../Albums/Albums";


export default function AlbumItem() {
    const history = useHistory();

    let { albumId, photoIndex = 0, slug } = useParams();
    photoIndex = Number(photoIndex);

    const [photos, setPhotos] = useState(null);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
            .then(response => response.json())
            .then(data => setPhotos(data))
    }, [albumId])

    const go = (number) => {
        history.push(`/albums/${albumId}/${slug}/${photoIndex + number}`)
    }
    const classes = useStyles();



    return (
        <>
            {!photos ? <LinearProgress />
                : (
                    <Card className={classes.root}>
                        <CardMedia
                            className={classes.media}
                            image={photos[photoIndex].thumbnailUrl}
                            title={photos[photoIndex].title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {slug.replaceAll('-', ' ')}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {photos[photoIndex].title}
                            </Typography>
                        </CardContent>
                        <CardActions className={classes.arrows}>
                            <Button size="small" color="primary" onClick={() => go(-1)} disabled={photoIndex === 0}>
                                <LeftIcon />
                            </Button>
                            <Button size="small" color="primary" onClick={() => go(1)} disabled={photoIndex === photos.length - 1}>
                                <RightIcon />
                            </Button>
                        </CardActions>
                    </Card>
                )
            }
        </>

    )
}

