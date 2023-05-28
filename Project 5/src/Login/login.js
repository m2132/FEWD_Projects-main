import { useState } from "react";
import { useHistory } from "react-router";
import Registration from '../localStorage'

import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { Avatar, Button, TextField, FormControlLabel, Grid, Box, Typography, Container, CssBaseline } from "@material-ui/core";
import { useStyles } from "./styles";

export default function Login(props) {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const changeFormState = ({ target }) => {
        setForm({
            ...form,
            [target.name]: target.value
        });
    }

    const [errorMessage, setErrorMessage] = useState('');

    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
        const users = await response.json();

        for (const user of users) {
            if (user.email === form.email) {
                if (user.address.geo.lat.endsWith(form.password) && form.password.length === 4) {
                    Registration.login(user.id);
                    props.login(user.id);
                    history.push(`/`);
                    return;
                } else {
                    setErrorMessage('The password is incorrect');
                    return;
                }
            }
        }

        setErrorMessage('User not found');
    }

    const classes = useStyles();

    return (
        <Container maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        onChange={changeFormState}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        onChange={changeFormState}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </Container>
    );
}


