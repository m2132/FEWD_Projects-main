import Albums from '../Albums/Albums';
import Posts from '../Posts/Posts';
import Todos from '../Todos/Todos';
import Info from '../Info/Info';
import Welcome from '../Welcome/Welcome';
import PostItem from '../PostItem/PostItem';
import AlbumItem from '../AlbumItem/AlbumItem';
import { Switch, Route } from 'react-router-dom';


export default function MainContent() {

    return (
        <>
        <Switch>
            <Route path="/posts/:postId/:slug" component={PostItem} />
            <Route path="/posts" component={Posts} />

            <Route path="/albums/:albumId/:slug/:photoIndex?" component={AlbumItem} />
            <Route path="/albums" component={Albums} />

            <Route path="/todos" component={Todos} />
            <Route path="/info" component={Info} />


            <Route component={Welcome} />
        </Switch>
        </>
    )
}