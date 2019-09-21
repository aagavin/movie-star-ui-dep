import { IonBackButton, IonBadge, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import useReactRouter from 'use-react-router';
import { BASE_IMG, BASE_URL } from '../../declarations';

interface LocationState {
  mediaId?: string;
  numOfEpisodes?: number;
  seasonNumber?: number;
}

interface CardResults {
  id: React.ReactText,
  still_path: any,
  name: React.ReactNode,
  overview: React.ReactNode,
  vote_average: React.ReactNode,
  air_date: React.ReactNode,
}

// tslint:disable: no-string-literal
// tslint:disable: no-unused-expression
const EpisodesPage: React.FC<any> = () => {

  const [results, setResults] = useState([]);
  const { match } = useReactRouter();

  useEffect(() => {match.params && getResults(match.params)}, [match.params]);

  const getResults = async (locationState: LocationState) => {
    const fetchList = [];
    for (let i = 0; i < locationState.numOfEpisodes; i++) {
      const url = `${BASE_URL}/media/tv/${locationState.mediaId}/season/${locationState.seasonNumber}/episode/${i+1}`;
      fetchList.push(fetch(url).then(r => r.json()));
    }
    setResults(await Promise.all(fetchList));
  }

  const getCard = (result: CardResults) => (
    <IonCard key={result.id} id={`card-${result.id}`}>
      <IonCardHeader>
        <IonCardSubtitle><IonImg src={`${BASE_IMG}/w500${result.still_path}`} /></IonCardSubtitle>
        <IonCardTitle>{result.name}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        {result.overview}
      </IonCardContent>
      <IonCardContent>
        <IonRow>
          <IonCol size="auto">
            <IonBadge color="light">{result.vote_average}</IonBadge>
          </IonCol>
          <IonCol size="auto">
            <IonBadge color="light">{result.air_date}</IonBadge>
          </IonCol>
        </IonRow>
      </IonCardContent>
    </IonCard>
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/home/media/tv/${match.params['mediaId']}`} />
          </IonButtons>
          <IonTitle>Episodes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {(results.length > 0) && (results.map(result => getCard(result)))}
      </IonContent>
    </IonPage>
  );
};

export default EpisodesPage;
