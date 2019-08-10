import { IonApp, IonPage, IonProgressBar, IonReactRouter, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { home, logIn, logOut, search, starOutline } from 'ionicons/icons';
import React, { FunctionComponent, Suspense, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import withFirebaseAuth from 'react-with-firebase-auth';

import asyncComponent from './AsyncComponent';

import UserContext, { init } from './context'
import { AppPage } from './declarations';
import { firebaseAppAuth } from './firebaseConfig';

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
import '@ionic/core/css/display.css';
import '@ionic/core/css/flex-utils.css';
import '@ionic/core/css/float-elements.css';
import '@ionic/core/css/padding.css';
import '@ionic/core/css/text-alignment.css';
import '@ionic/core/css/text-transformation.css';

const commonPages: AppPage[] = [
  {
    icon: home,
    title: 'Home',
    url: '/home'
  },
  {
    icon: search,
    title: 'Search',
    url: '/search'
  },
];

const loggedInPages: AppPage[] = [
  {
    icon: starOutline,
    title: 'Favourites',
    url: '/favourite'
  },
  {
    icon: logOut,
    title: 'Logout',
    url: '/account/logout'
  }
];

const loggedOutPages: AppPage[] = [
  {
    icon: logIn,
    title: 'Login',
    url: '/account/login'
  }
];

const App: FunctionComponent = (props: any) => {

  const [pages, setPages] = useState<AppPage[]>(commonPages);
  const [context, setContext] = useState<any>({});
  const Logout = () => { props.signOut(); return <Redirect to="/home" /> }
  const RedirectHome = () => <Redirect to="/home" />;

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    init.user = props.user;
    init.signInWithEmailAndPassword = props.signInWithEmailAndPassword;
    init.createUserWithEmailAndPassword = props.createUserWithEmailAndPassword;
    init.error = props.error;

    if (props.user) {
      getFavs();
      setPages([...commonPages, ...loggedInPages]);
    }
    else {
      setPages([...commonPages, ...loggedOutPages]);
    }
    setContext(init);
  }, [props.user]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const getFavs = async () => {
    const favsDoc = await init.getFavourites(props.user.uid);
    init.favourites = Object.values(favsDoc.data());
    sessionStorage.setItem('favs', JSON.stringify(Object.values(favsDoc.data())));
  }

  return (
    <IonApp>
      <Suspense fallback={<IonProgressBar type="indeterminate" />}>
        <IonReactRouter>
          <IonSplitPane contentId="main">
          <UserContext.Provider value={context}>
            <Menu appPages={pages} />
            <IonPage id="main">
              <IonRouterOutlet>
                <Route path="/home" component={Home} exact />
                <Route path="/home/media/:catogery/:mediaId" component={Media} exact />
                <Route path="/home/media/:catogery/:mediaId/season/:seasonNumber/episodes/:numOfEpisodes" component={Episodes} exact />
                <Route path="/search" component={Search} exact />
                <Route path="/favourite" component={Favourite} exact />
                <Route path="/account/login" component={Login} exact />
                <Route path="/account/logout" render={Logout} exact />
                <Route path="/account/signup" component={SignUp} exact />
                <Route exact path="/" render={RedirectHome} />
              </IonRouterOutlet>
            </IonPage>
            </UserContext.Provider>
          </IonSplitPane>
        </IonReactRouter>
      </Suspense>
    </IonApp>
  );
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(App);
