import { Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import HomePage from 'pages/application/HomePage';
import PostShowPage from 'pages/posts/PostShowPage';
import PostsIndexPage from 'pages/posts/PostsIndexPage';
import PostNewPage from 'pages/posts/PostNewPage'
import PostEditPage from 'pages/posts/PostEditPage'
import ErrorBoundary from 'layout/ErrorBoundary';
import SignUpPage from 'pages/users/SignUpPage';
import PageNotFound from 'layout/PageNotFound';
import PrivateRoute from 'components/PrivateRoute';
import usersPathHelper from 'helper/pathHelper/users';
import appPathHelper from 'helper/pathHelper/app';
import SignInPage from 'pages/users/SignInPage';

const AppRoute = () => {
    const {
        newUserRegistrationsPath,
        createUserSessionsPath
    } = usersPathHelper()
    const { pageNotFoundPath } = appPathHelper()
    return (
        <IonReactRouter>
            <IonRouterOutlet>
                <ErrorBoundary>
                    <Route exact path="/" component={HomePage} />

                    <PrivateRoute exact path="/posts/new">
                        <PostNewPage />
                    </PrivateRoute>
                    <PrivateRoute exact path="/posts/:id(\d+)/edit">
                        <PostEditPage />
                    </PrivateRoute>
                    <PrivateRoute exact path="/posts/:id(\d+)">
                        <PostShowPage />
                    </PrivateRoute>
                    <PrivateRoute exact path="/posts">
                        <PostsIndexPage />
                    </PrivateRoute>
                    
                    <Route exact path={newUserRegistrationsPath} component={SignUpPage} />
                    <Route exact path={createUserSessionsPath} component={SignInPage} />

                    <Route exact path={pageNotFoundPath} component={PageNotFound} />
                </ErrorBoundary>
            </IonRouterOutlet>
            {/* <TabBar /> */}
        </IonReactRouter >
    )
}

export default AppRoute
