import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Home from './pages/Home';
import PostShowPage from './pages/posts/PostShowPage';
import PostsIndexPage from './pages/posts/PostsIndexPage';
import PostNewPage from './pages/posts/PostNewPage'
import PostEditPage from './pages/posts/PostEditPage'
import DashBoardIndexPage from 'pages/dashboard/DashboardIndexPage';
// import TabBar from './components/TabBar';

const AppRoute = () => {

    return (
        <IonReactRouter>
            <IonRouterOutlet>
                {/* <Route exact path="/posts/new">
                    <PostNewPage />
                </Route>
                <Route path="/posts/:id(\d+)/edit">
                    <PostEditPage />
                </Route>
                <Route path="/posts/:id(\d+)">
                    <Post />
                </Route>
                <Route exact path="/posts">
                    <Posts />
                </Route>

                <Route exact path="/home">
                    <Home />
                </Route>

                <Route exact path="/">
                    <Redirect to="/home" />
                </Route> */}

                <Route exact path="/" component={Home} />

                <Route exact path="/posts/new" component={PostNewPage} />

                <Route exact path="/posts/:id(\d+)/edit" component={PostEditPage} />
                <Route exact path="/posts/:id(\d+)" component={PostShowPage} />

                <Route exact strict path="/posts" component={PostsIndexPage} />

                <Route exact path="/dashboard" component={DashBoardIndexPage} />

            </IonRouterOutlet>

            {/* <TabBar /> */}
        </IonReactRouter>
    )
}

export default AppRoute
