import {
  IonButtons,
  IonCardContent,
  IonContent,
  IonHeader,
  IonLabel,
  IonMenuButton,
  IonProgressBar,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import ResultsList from '../components/ResultsList';
import { BASE_URL } from '../declarations';

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

  const getResults = async (ResultCatogery: string, filter: string = 'upcoming') => {
    fetch(`${BASE_URL}/media/${ResultCatogery}/${filter}`)
      .then(res => res.json())
      .then(res => {
        ResultCatogery === 'movie' ?
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
          <IonTitle>Popular Movies &amp; TV shows</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* tslint:disable-next-line: jsx-no-lambda */}
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
