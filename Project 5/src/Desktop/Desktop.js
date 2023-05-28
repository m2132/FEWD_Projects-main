
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import MainContent from '../MainContent/MainContent';

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Tooltip } from '@material-ui/core';
import LogOutIcon from '@material-ui/icons/AccountCircle'; 

import HomeIcon from '@material-ui/icons/Home';
import PostsIcon from '@material-ui/icons/ImportContacts';
import TodosIcon from '@material-ui/icons/FormatListBulleted';
import AlbumsIcon from '@material-ui/icons/PhotoAlbum';
import InfoIcon from '@material-ui/icons/Info';

import { useStyles } from './styles';
import Registration from '../localStorage'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Desktop () {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const toggleOpen = () => setOpen(!open);

    const { pathname } = useLocation();
    const headerTitle = pathname.split('/')[1].toUpperCase() || 'HOME';

    const history = useHistory()

    const logout = () => {
        Registration.logout();
        history.push('/login');
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {headerTitle}
                    </Typography>

                    <Tooltip title="Log Out" style={{ marginLeft: 'auto' }}>
                        <IconButton onClick={logout}>
                            <LogOutIcon style={{ color: 'white'}} />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={toggleOpen}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <Link className={classes.link} to="/">
                        <ListItem button>
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                    </Link>

                    <Link className={classes.link} to="/posts">
                        <ListItem button>
                            <ListItemIcon><PostsIcon /></ListItemIcon>
                            <ListItemText primary="Posts" />
                        </ListItem>
                    </Link>

                    <Link className={classes.link} to="/albums">
                        <ListItem button>
                            <ListItemIcon><AlbumsIcon /></ListItemIcon>
                            <ListItemText primary="Albums" />
                        </ListItem>
                    </Link>

                    <Link className={classes.link} to="/todos">
                        <ListItem button>
                            <ListItemIcon><TodosIcon /></ListItemIcon>
                            <ListItemText primary="Todos" />
                        </ListItem>
                    </Link>
                </List>

                <Divider />

                <List>
                    <Link className={classes.link} to="/info">
                        <ListItem button>
                            <ListItemIcon><InfoIcon /></ListItemIcon>
                            <ListItemText primary="Info" />
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <MainContent />
            </main>
        </div>
    );
}
