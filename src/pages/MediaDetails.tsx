import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonImg, IonTitle, IonToolbar, IonButton, IonBadge, IonGrid, IonRow, IonCol, IonToast, IonIcon, IonItem, IonLabel } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import Firebase from 'firebase';
import useReactRouter from 'use-react-router';
import { providers, firebaseAppAuth, firebaseApp } from "../firebaseConfig";
import { BASE_IMG, BASE_URL } from "../declarations";

interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

interface NextEpisodeToAir {
  air_date: string;
}

interface MediaDetail {
  adult?: boolean;
  badge1?: string;
  badge2?: string;
  badge3?: string;
  backdrop_path?: string;
  belongs_to_collection?: BelongsToCollection;
  budget?: number;
  genres?: Genre[];
  homepage?: string;
  id?: number;
  imdb_id?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  name?: string;
  next_episode_to_air?: NextEpisodeToAir;
  popularity?: number;
  poster_path?: string;
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  release_date?: string;
  revenue?: number;
  runtime?: number;
  spoken_languages?: SpokenLanguage[];
  status?: string;
  seasons?: [];
  tagline?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}


const MidiaDetails: React.FC<any> = (props: any) => {

  const emptyResult: MediaDetail = {};
  const { history, match } = useReactRouter();
  const [result, setResult] = useState(emptyResult);
  const [showToast, setShowToast] = useState(false);
  const [showSeasons, setShowSeasons] = useState(false);
  const [catogery] = useState(match.params['catogery']);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${BASE_URL}/${catogery}/${match.params['mediaId']}`;
      const response = await fetch(url);
      setResult(await response.json());
    }
    fetchData();
  }, []);

  const addToFavourite = async () => {
    const t = await Firebase.firestore().collection('favs').doc('userIDstuff').get();
    console.log(t);
    // ({
    //   userIDstuff: ['']
    // });
    setShowToast(true);
  }

  const getSeaons = () => {
    return result.seasons.map((season: any) => (
      <IonCard key={season.id}>
        <IonCardHeader>
          <IonCardSubtitle><IonImg src={`${BASE_IMG}/w500${season.poster_path}`} /></IonCardSubtitle>
          <IonCardTitle>{season.name}</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          {season.overview}
          <br />
          <IonBadge color="light">{season.episode_count} episodes</IonBadge>

          <IonItem button detail onClick={e => { e.preventDefault(); history.push({ pathname: '/home/media/episodes', state: { id: match.params['mediaId'], seasonNum: season.season_number, numOfEpisodes: season.episode_count } }) }}>
            <IonLabel>
              View Episodes
            </IonLabel>
          </IonItem>
        </IonCardContent>
      </IonCard>
    ));
  };


  const res = {
    ...result,
    title: result && result.title ? result.title : result.name,
    badge1: `raiting: ${result.vote_average}`
  };

  if (catogery === 'movie') {
    result['badge2'] = `runtime: ${result.runtime}`;
    result['badge3'] = result.release_date;
  }
  else {
    result['badge2'] = result.next_episode_to_air ? `next episode: ${result.next_episode_to_air.air_date}` : '';
    result['badge3'] = '';
  }


  return (
    <>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message='Your settings have been saved.'
        duration={200}
      >
      </IonToast>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton routerDirection="back" onClick={history.goBack}>
              <IonIcon name="arrow-back"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>{catogery}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>
              <img src={`${BASE_IMG}/w500${result.poster_path}`} />
            </IonCardSubtitle>
            <IonCardTitle><b>{result.title}</b></IonCardTitle>
          </IonCardHeader>

          <IonCardContent>{result.overview}</IonCardContent>
          <IonCardContent>
            <IonGrid align-items-start>
              <IonRow>
                <IonCol size="auto">
                  <IonBadge color="light">{result.badge1}</IonBadge>
                </IonCol>
                <IonCol size="auto">
                  <IonBadge color="light">{result.badge2}</IonBadge>
                </IonCol>
                <IonCol size="auto">
                  <IonBadge color="light">{result.badge3}</IonBadge>
                </IonCol>
              </IonRow>
              <IonButton expand="block" color="primary" onClick={e => addToFavourite()}>Add to favourite</IonButton>
            </IonGrid>
          </IonCardContent>
          <IonCardContent>
            {catogery === 'tv' ? ( 
              <IonButton expand="full" fill="clear" onClick={e => setShowSeasons(!showSeasons)}>Show Seasons</IonButton>
            ) : ''}
          </IonCardContent>
        </IonCard>

        {showSeasons ? getSeaons() : ''}
      </IonContent>
    </>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(MidiaDetails);
