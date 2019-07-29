import React, { useEffect, useState } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonImg, IonCardTitle, IonCardContent, IonRow, IonCol, IonBadge, IonBackButton } from '@ionic/react';
import useReactRouter from 'use-react-router';
import { BASE_URL, BASE_IMG } from "../../declarations";

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

const EpisodesPage: React.FC<any> = () => {

  const [results, setResults] = useState([]);
  const { match } = useReactRouter();

  useEffect(() => {
    match.params && getResults(match.params)
  }, [match.params]);

  const getResults = async (locationState: LocationState) => {
    const fetchList = [];
    for (let i = 0; i < locationState.numOfEpisodes; i++) {
      const url = `${BASE_URL}/media/tv/${locationState.mediaId}/season/${locationState.seasonNumber}/episode/${i+1}`;
      fetchList.push(fetch(url).then(r => r.json()));
    }
    const results = await Promise.all(fetchList);
    setResults(results);
  }

  const getCard = (result: CardResults) => (
    <IonCard key={result.id}>
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
    <>
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
    </>
  );
};

export default EpisodesPage;
