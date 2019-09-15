import {
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonMenuButton,
  IonPage,
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
  const [movieResults, setMovieResults] = useState(<></>);
  const [tvResults, setTvResults] = useState(<></>);

  useEffect(() => {
    Promise.all([
      getResults('movie'),
      getResults('tv', 'popular')
    ]);
  }, []);

  const getResults = async (resultCatogery: string, filter: string = 'upcoming') => {
    fetch(`${BASE_URL}/media/${resultCatogery}/${filter}`)
      .then(res => res.json())
      .then(res => {
        if (resultCatogery === 'movie') {
          setMovieResults(<ResultsList results={res} catogery={resultCatogery} />);
        }
        else {
          setTvResults(<ResultsList results={res} catogery={resultCatogery} />);
        }
      });
  }

  const getResultsList = () => catogery === 'movie' ? movieResults : tvResults;

  return (
    <IonPage>
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
        {
          (tvResults !== <></> && tvResults !== <></>) ?
            getResultsList() :
            <IonProgressBar type="indeterminate" />
        }
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
