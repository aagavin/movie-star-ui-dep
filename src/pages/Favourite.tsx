import React, { useState, useEffect } from 'react';
import { auth } from 'firebase';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonProgressBar } from '@ionic/react';
import withFirebaseAuth from 'react-with-firebase-auth'

import MediaDetailsCard from '../components/MediaDetailsCard';

import { BASE_URL, MediaDetail } from '../declarations';
import { providers, firebaseAppAuth } from '../firebaseConfig';

interface FavResults {
  favs?: MediaDetail[]
}

const Favourite: React.FC<any> = props => {

  const [results, setResults] = useState<FavResults>();

  useEffect(() => {
    if (props.user) {
      auth().currentUser.getIdToken(true).then(async (token) => {
        const url = `${BASE_URL}/user/favourites`;
        const favs = await fetch(url, { headers: { 'id_token': token } }).then(r => r.json());
        setResults(favs);
        console.log(favs);
      });
    }
  }, [props.user])

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
      {results ?
        results.favs.map(res => <MediaDetailsCard key={res.id} res={res} />) :
        <IonProgressBar type="indeterminate" />
      }
    </IonContent>
  </>)
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(Favourite);
