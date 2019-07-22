import React, { lazy, Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonPage, IonReactRouter, IonRouterOutlet, IonSplitPane } from '@ionic/react';
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


import { home, logIn, search, starOutline } from 'ionicons/icons';

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

const appPages: AppPage[] = [
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
  {
    title: 'Login',
    url: '/account/login',
    icon: logIn
  },
  {
    title: 'Favourites',
    url: '/favourite',
    icon: starOutline
  }
];

const App: React.FunctionComponent = () => (
  <IonApp>
    <Suspense fallback={<div>Loading...</div>}>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu appPages={appPages} />
          <IonPage id="main">
            <IonRouterOutlet>
              <Route path="/:tab(home)" component={Home} exact={true} />
              <Route path="/:tab(home)/media/:catogery/:mediaId" component={Media} />
              <Route path="/:tab(home)/media/episodes" component={Episodes} />
              <Route path="/search" component={Search} exact={true} />
              <Route path="/favourite" component={Favourite} exact={true} />
              <Route path="/account/login" component={Login} exact={true} />
              <Route path="/account/signup" component={SignUp} exact={true} />
              <Route exact path="/" render={() => <Redirect to="/home" />} />
            </IonRouterOutlet>
          </IonPage>
        </IonSplitPane>
      </IonReactRouter>
    </Suspense>
  </IonApp>
);

export default App;
