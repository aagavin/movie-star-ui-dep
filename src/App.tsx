import React, { Suspense, useEffect, useState, FunctionComponent, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonPage, IonReactRouter, IonRouterOutlet, IonSplitPane, IonProgressBar } from '@ionic/react';
import { home, logIn, logOut, search, starOutline } from 'ionicons/icons';
import withFirebaseAuth from 'react-with-firebase-auth';

import asyncComponent from './AsyncComponent';

import { firebaseAppAuth } from './firebaseConfig';
import { AppPage } from './declarations';
import UserContext from './context'

import Menu from './components/Menu';

const Home = asyncComponent(() => import('./pages/Home').then(module => module.default));

/* eslint-disable import/first */
const Search = asyncComponent(() => import('./pages/media/Search').then(module => module.default));
const Media = asyncComponent(() => import('./pages/media/MediaDetails').then(module => module.default));
const Favourite = asyncComponent(() => import('./pages/Favourite').then(module => module.default));
const SignUp = asyncComponent(() => import('./pages/account/Signup').then(module => module.default));
const Episodes = asyncComponent(() => import('./pages/media/Episodes').then(module => module.default));
const Login = asyncComponent(() => import('./pages/account/Login').then(module => module.default));

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
    title: 'Favourites',
    url: '/favourite',
    icon: starOutline
  },
  {
    title: 'Logout',
    url: '/account/logout',
    icon: logOut
  }
];

const loggedOutPages: AppPage[] = [
  {
    title: 'Login',
    url: '/account/login',
    icon: logIn
  }
];

const App: FunctionComponent = (props: any) => {

  const [pages, setPages] = useState<AppPage[]>(commonPages);
  const context = useContext(UserContext);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    context.user = props.user;
    context.signInWithEmailAndPassword = props.signInWithEmailAndPassword;
    context.createUserWithEmailAndPassword = props.createUserWithEmailAndPassword;
    context.error = props.error;

    if (props.user) {
      getFavs();
      setPages([...commonPages, ...loggedInPages]);
    }
    else {
      setPages([...commonPages, ...loggedOutPages]);
    }


  }, [props.user]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const getFavs = async () => {
    const favsDoc = await context.getFavourites(props.user.uid);
    sessionStorage.setItem('favs', JSON.stringify(Object.values(favsDoc.data())));
  }

  return (
    <IonApp>
      <Suspense fallback={<IonProgressBar type="indeterminate" />}>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu appPages={pages} />
            <IonPage id="main">
              <IonRouterOutlet>
                <Route path="/home" component={Home} exact={true} />
                <Route path="/home/media/:catogery/:mediaId" component={Media} exact={true} />
                <Route path="/home/media/:catogery/:mediaId/season/:seasonNumber/episodes/:numOfEpisodes" component={Episodes} exact={true} />
                <Route path="/search" component={Search} exact={true} />
                <Route path="/favourite" component={Favourite} exact={true} />
                <Route path="/account/login" component={Login} exact={true} />
                <Route path="/account/logout" render={() => { props.signOut(); return <Redirect to="/home" /> }} exact={true} />
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
