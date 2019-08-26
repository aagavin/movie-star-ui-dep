import { IonApp, IonPage, IonProgressBar, IonReactRouter, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { home, logIn, logOut, search, starOutline } from 'ionicons/icons';
import React, { FunctionComponent, Suspense, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import withFirebaseAuth from 'react-with-firebase-auth';

import UserContext, { getFavourites, init } from './context'
import { AppPage } from './declarations';
import { firebaseAppAuth } from './firebaseConfig';

import Menu from './components/Menu';

/* eslint-disable import/first */
const Home = React.lazy(() => import('./pages/Home'))

const Search = React.lazy(() => import('./pages/media/Search'));
const Media = React.lazy(() => import('./pages/media/MediaDetails'));
const Favourite = React.lazy(() => import('./pages/Favourite'));
const SignUp = React.lazy(() => import('./pages/account/Signup'));
const Episodes = React.lazy(() => import('./pages/media/Episodes'));
const Login = React.lazy(() => import('./pages/account/Login'));

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
  const [ctx, setCtx] = useState<any>({});
  const Logout = () => {
    props.signOut();
    ctx.favourites = [];
    return <Redirect to="/home" />
  }
  const RedirectHome = () => <Redirect to="/home" />;

  const setContext = (contextFx: React.Dispatch<any>, context: any, properties: any, favourites: any = []) => {
    contextFx({
      ...init,
      ...context,
      user: properties.user,
      signInWithEmailAndPassword: properties.signInWithEmailAndPassword,
      createUserWithEmailAndPassword: properties.createUserWithEmailAndPassword,
      favourites,
      error: properties.error,
    });
  }

  useEffect(() => { setCtx(init) }, []);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setContext(setCtx, ctx, props);

    if (props.user) {
      getFavourites(props.user.uid)
        .then(favsDoc => setContext(setCtx, ctx, props, Object.values(favsDoc.data())))
        .catch(e => new Error(e.message));
      setPages([...commonPages, ...loggedInPages]);
    }
    else {
      setPages([...commonPages, ...loggedOutPages]);
    }
  }, [props]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <IonApp>
      <Suspense fallback={<IonProgressBar type="indeterminate" />}>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <UserContext.Provider value={ctx}>
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

