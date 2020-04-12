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
import { Helmet } from 'react-helmet';
import ResultsList from '../components/ResultsList';
import { BASE_URL } from '../declarations';

const HomePage: React.FunctionComponent = () => {

  const [catogery, setCatogery] = useState('movie');
  const [isLoading, setIsLoading] = useState(true);
  const [movieResults, setMovieResults] = useState(<></>);
  const [tvResults, setTvResults] = useState(<></>);

  useEffect(() => {
    Promise.all([
      getResults('movies'),
      getResults('tv')
    ]);
  }, []);

  const getResults = async (resultCatogery: string, filter = 'popular') => {
    fetch(`${BASE_URL}/media/${resultCatogery}/${filter}`)
      .then(res => res.json())
      .then(res => res.map(r => (
        {
          ...r,
          image: {
            ...r.image,
            url: r.image?.url.replace('_V1_', '_SX100_')
          }
        })))
      .then(res => {
        if (resultCatogery === 'movies') {
          setMovieResults(<ResultsList results={res} catogery="feature" />);
        }
        else {
          setTvResults(<ResultsList results={res} catogery="tvSeries" />);
        }
        setIsLoading(false);
      });
  }

  const getResultsList = () => catogery === 'movie' ? movieResults : tvResults;

  return (
    <IonPage>
      <Helmet>
        <title>Movie Star</title>
      </Helmet>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Popular Movies &amp; TV shows</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSegment onIonChange={e => setCatogery(`${e.detail.value}`)} value={catogery}>
          <IonSegmentButton value="movie">
            <IonLabel>Movie</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="tv">
            <IonLabel>TV</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        {!isLoading ? getResultsList() : <IonProgressBar type="indeterminate" />}
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
