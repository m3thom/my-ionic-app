import { Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Home from './pages/Home';
import PostShowPage from './pages/posts/PostShowPage';
import PostsIndexPage from './pages/posts/PostsIndexPage';
import PostNewPage from './pages/posts/PostNewPage'
import PostEditPage from './pages/posts/PostEditPage'
import DashBoardIndexPage from 'pages/dashboard/DashboardIndexPage';
// import TabBar from './components/TabBar'
import ErrorBoundary from 'layout/ErrorBoundary';
import SignInPage from 'pages/users/SignInPage';
import PageNotFound from 'layout/PageNotFound';

const AppRoute = () => {

    return (
        <IonReactRouter>
            <IonRouterOutlet>
                <ErrorBoundary>
                    <Route exact path="/" component={Home} />

                    <Route exact path="/posts/new" component={PostNewPage} />

                    <Route exact path="/posts/:id(\d+)/edit" component={PostEditPage} />
                    <Route exact path="/posts/:id(\d+)" component={PostShowPage} />

                    <Route exact strict path="/posts" component={PostsIndexPage} />

                    <Route exact path="/dashboard" component={DashBoardIndexPage} />

                    <Route exact path="/users/sign_in" component={SignInPage} />

                    <Route exact path="/page_not_found" component={PageNotFound} />
                </ErrorBoundary>
            </IonRouterOutlet>
            {/* <TabBar /> */}
        </IonReactRouter >
    )
}

export default AppRoute
