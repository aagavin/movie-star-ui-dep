import React, { useState, useEffect } from 'react';
import { auth } from 'firebase';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonProgressBar } from '@ionic/react';
import withFirebaseAuth from 'react-with-firebase-auth';
import useReactRouter from 'use-react-router';

import MediaDetailsCard from '../components/MediaDetailsCard';

import { BASE_URL, MediaDetail } from '../declarations';
import { providers, firebaseAppAuth } from '../firebaseConfig';

interface FavResults {
  favs?: MediaDetail[]
}

const Favourite: React.FC<any> = props => {

  const [results, setResults] = useState<FavResults>();
  const { history } = useReactRouter();
  
  useEffect(() => {
    if (history.location.pathname !== '/favourite') {
      setResults({favs: []});
    }
    else if (history.location.pathname === '/favourite') {
      getFavs();
    }
  }, [history.location.pathname, props.user]);

  const getFavs = async () => {
    if (props.user) {
      const token = await auth().currentUser.getIdToken(true);
      const url = `${BASE_URL}/user/favourites`;
      const favs = await fetch(url, { headers: { 'id_token': token } }).then(r => r.json());
      setResults(favs);
    }
  }

  const getContent = () => {
    if (props.user === null) {
      return <h1>Login to view favourites</h1>
    }

    if (results) {
      return results.favs.map(res => <MediaDetailsCard key={res.id} res={res} />);
    }

    return <IonProgressBar type="indeterminate" />
  }

  return (<>
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>Favourites</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      {getContent()}
    </IonContent>
  </>)
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(Favourite);
