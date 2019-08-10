import React, { useState, useEffect, useContext } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonProgressBar } from '@ionic/react';

import UserContext from '../context';
import ResultsList from '../components/ResultsList';

interface FavResults {
  catogery?: string,
  id?: number,
  name?: string,
  poster_path?: string,
  title?: string,
}

const Favourite: React.FC<any> = () => {

  const [results, setResults] = useState<FavResults[]>();
  const context = useContext<any>(UserContext);

  useEffect(() => setResults(context.favourites), [context]);

  const getContent = () => {
    if (typeof context.user === 'undefined' || context.user === null) {
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