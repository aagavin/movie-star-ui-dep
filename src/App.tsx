import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonPage, IonReactRouter, IonRouterOutlet, IonSplitPane, IonProgressBar } from '@ionic/react';
import { home, logIn, logOut, search, starOutline } from 'ionicons/icons';
import withFirebaseAuth from 'react-with-firebase-auth';

import { firebaseAppAuth } from './firebaseConfig';
import { AppPage } from './declarations';

import Menu from './components/Menu';
import Home from './pages/Home';

/* eslint-disable import/first */
const Search = lazy(() => import('./pages/media/Search'));
const Media = lazy(() => import('./pages/media/MediaDetails'));
const Favourite = lazy(() => import('./pages/Favourite'));
const SignUp = lazy(() => import('./pages/account/Signup'));
const Episodes = lazy(() => import('./pages/media/Episodes'));
const Login = lazy(() => import('./pages/account/Login'));

/* Core CSS required for Ionic components to work properly */
import '@ionic/core/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/core/css/normalize.css';
import '@ionic/core/css/structure.css';
import '@ionic/core/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/core/css/padding.css';
import '@ionic/core/css/float-elements.css';
import '@ionic/core/css/text-alignment.css';
import '@ionic/core/css/text-transformation.css';
import '@ionic/core/css/flex-utils.css';
import '@ionic/core/css/display.css';

const commonPages: AppPage[] = [
  {
    title: 'Home',
    url: '/home',
    icon: home
  },
  {
    title: 'Search',
    url: '/search',
    icon: search
  },
];

const loggedInPages: AppPage[] = [
  {
    title: 'Logout',
    url: '/account/logout',
    icon: logOut
  },
  {
    title: 'Favourites',
    url: '/favourite',
    icon: starOutline
  }
];

const loggedOutPages: AppPage[] = [
  {
    title: 'Login',
    url: '/account/login',
    icon: logIn
  }
];

const App: React.FunctionComponent = (props: any) => {

  const [pages, setPages] = useState<AppPage[]>(commonPages);


  useEffect(() => {
    if (props.user) {
      setPages([...commonPages, ...loggedInPages]);
    }
    else {
      setPages([...commonPages, ...loggedOutPages]);
    }
  }, [props.user, loggedInPages]);

  return (
    <IonApp>
      <Suspense fallback={<IonProgressBar type="indeterminate" />}>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu appPages={pages} />
            <IonPage id="main">
              <IonRouterOutlet>
                <Route path="/:tab(home)" component={Home} exact={true} />
                <Route path="/:tab(home)/media/:catogery/:mediaId" component={Media} />
                <Route path="/:tab(home)/media/episodes" component={Episodes} />
                <Route path="/search" component={Search} exact={true} />
                <Route path="/favourite" component={Favourite} exact={true} />
                <Route path="/account/login" component={Login} exact={true} />
                <Route path="/account/logout" render={() => {props.signOut(); return <Redirect to="/home" />}} exact={true} />
                <Route path="/account/signup" component={SignUp} exact={true} />
                <Route exact path="/" render={() => <Redirect to="/home" />} />
              </IonRouterOutlet>
            </IonPage>
          </IonSplitPane>
        </IonReactRouter>
      </Suspense>
    </IonApp>
  );
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(App);
