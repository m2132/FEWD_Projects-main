import { useEffect, useState } from "react";
import Registration from '../localStorage';
import { LinearProgress, Typography, makeStyles, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom';

export default function Welcome() {

    const [user, setUser] = useState();
    const userId = Registration.getUserId();
    const history = useHistory();

    const goToUrl = event => {
        history.push(`/${event.target.textContent.toLowerCase()}`)
    }

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then(response => response.json())
            .then(data => setUser(data));
    }, [userId])

    const classes = makeStyles({
        welcome: {
            fontWeight: 700,
            color: '#929292',
            textAlign: 'center',
            fontSize: '3em',
        },

        name: {
            fontWeight: 700,
            color: '#464646',
            textAlign: 'center',
            fontSize: '4em',
        },

        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh'
        }
    })()

    return (
        !user ? <LinearProgress />
            : <div className={classes.container}>
                <div>
                    <Typography className={classes.welcome}>Welcome</Typography>
                    <Typography className={classes.name}>{user.name}</Typography>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {['Posts', 'Albums', 'Todos', 'Info'].map(link =>
                            <Button variant="contained" color="primary" onClick={goToUrl} style={{ margin: '80px 10px' }}>
                                {link}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
    )
}
