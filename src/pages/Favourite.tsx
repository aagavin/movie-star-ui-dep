import React, { useState, useEffect, useContext } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonProgressBar } from '@ionic/react';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import useReactRouter from 'use-react-router';

import UserContext from '../context';
import ResultsList from '../components/ResultsList';

interface FavResults {
  catogery?: string,
  id?: number,
  name?: string,
  poster_path?: string,
  title?: string,
}

const Favourite: React.FC<any> = props => {

  const [results, setResults] = useState<FavResults[]>();
  const { history } = useReactRouter();
  const context = useContext<any>(UserContext);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (history.location.pathname !== '/favourite' && !history.location.pathname.includes('/home/media')) {
      setResults([]);
    }
    else if (history.location.pathname === '/favourite') {
      getFavs();
    }
  }, [history.location.pathname, context.user]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const getFavs = async () => {
    if (context.user) {
      firebase.firestore().collection('favs').doc(context.user.uid).get().then(doc => {
        doc.data() ? setResults(Object.values(doc.data())) : setResults([]);
      });
    }
  }

  const getContent = () => {
    if (context.user === null) {
      return <h1>Login to view favourites</h1>
    }

    if (results && results.length > 0) {
      return <ResultsList results={results} />
    }
    else if (results && results.length === 0) {
      return <>No favourites :( <br />Add some</>
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

export default Favourite;