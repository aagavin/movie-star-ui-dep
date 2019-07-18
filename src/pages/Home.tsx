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
import './Home.css';
import ResultsList from '../components/ResultsList';
import { BASE_URL } from "../declarations";

const HomePage: React.FunctionComponent = () => {

  const [catogery, setCatogery] = useState('movie');
  const [movieResults, setMovieResults] = useState([]);
  const [tvResults, setTvResults] = useState([]);

  useEffect(() => {
    Promise.all([
      getResults('movie'),
      getResults('tv')
    ]);
  }, []);

  const getResults = async (catogery: string) => {
    fetch(`${BASE_URL}/${catogery}/upcoming`)
      .then(res => res.json())
      .then(res => {
        catogery === 'movie' ?
          setMovieResults(res) :
          setTvResults(res);
      });
  }

  const results = catogery === 'movie' ? movieResults : tvResults;
  if (results.length === 0) {
    return <IonProgressBar type="indeterminate" />
  }

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
        <IonSegment color="primary" onIonChange={e => setCatogery(`${e.detail.value}`)}>
          <IonSegmentButton checked={catogery === 'movie'} value="movie">
            <IonLabel>Movie</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton checked={catogery === 'tv'} value="tv">
            <IonLabel>TV</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <IonCardContent>
          {results.length === 0 ? <IonProgressBar type="indeterminate" /> : <ResultsList results={results} />}
        </IonCardContent>
      </IonContent>
    </>
  );
};

export default HomePage;
