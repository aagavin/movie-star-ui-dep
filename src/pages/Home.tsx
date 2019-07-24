import {
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonCardContent,
  IonProgressBar
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import ResultsList from '../components/ResultsList';
import { BASE_URL } from "../declarations";

const HomePage: React.FunctionComponent = () => {

  const [catogery, setCatogery] = useState('movie');
  const [movieResults, setMovieResults] = useState([]);
  const [tvResults, setTvResults] = useState([]);

  useEffect(() => {
    Promise.all([
      getResults('movie'),
      getResults('tv', 'popular')
    ]);
  }, []);

  const getResults = async (catogery: string, filter: string = 'upcoming') => {
    fetch(`${BASE_URL}/media/${catogery}/${filter}`)
      .then(res => res.json())
      .then(res => {
        catogery === 'movie' ?
          setMovieResults(res) :
          setTvResults(res);
      });
  }

  const results = catogery === 'movie' ? movieResults : tvResults;
  
  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSegment onIonChange={e => setCatogery(`${e.detail.value}`)}>
          <IonSegmentButton checked={catogery === 'movie'} value="movie">
            <IonLabel>Movie</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton checked={catogery === 'tv'} value="tv">
            <IonLabel>TV</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <IonCardContent>
          {results.length === 0 ? <IonProgressBar type="indeterminate" /> : <ResultsList results={results} catogery={catogery} />}
        </IonCardContent>
      </IonContent>
    </>
  );
};

export default HomePage;
