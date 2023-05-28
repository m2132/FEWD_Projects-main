import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Registration from '../localStorage';
import { Card, CardContent, Typography, Button, CardActions, LinearProgress, makeStyles } from "@material-ui/core";
import { useStyles } from "./styles";


export default function Albums() {

    const userId = Registration.getUserId();
    const [albums, setAlbums] = useState();
    const classes = useStyles();


    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
            .then(response => response.json())
            .then(data => setAlbums(data))
    }, [userId])

    const linearProgressClasses = makeStyles({ root: {width: '100%'}})();

    return (
        <div className={classes.container}>
            {!albums ? <LinearProgress className={linearProgressClasses.root} />
                : (
                    albums.map(album =>
                    
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography variant="h5" component="h2">{album.title}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button color="primary">
                                <Link to={`/albums/${album.id}/${album.title.replaceAll(' ', '-')}`} className={classes.link}>view</Link>
                            </Button>
                        </CardActions>
                    </Card>
                ))
            }
        </div>
    )
}