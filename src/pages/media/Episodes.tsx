import React, { useEffect, useState } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonButton, IonIcon, IonCard, IonCardHeader, IonCardSubtitle, IonImg, IonCardTitle, IonCardContent, IonRow, IonCol, IonBadge } from '@ionic/react';
import useReactRouter from 'use-react-router';
import { BASE_URL, BASE_IMG } from "../../declarations";

interface LocationState {
  id: string;
  numOfEpisodes: number;
  seasonNum: number;
}

const EpisodesPage: React.FC<any> = props => {

  const [results, setResults] = useState([]);
  const { history } = useReactRouter();

  useEffect(() => {
    props.location.state && getResults(props.location.state)
  }, [props.location.state]);

  const getResults = async (locationState: LocationState) => {
    const fetchList = [];
    for (let i = 1; i < locationState.numOfEpisodes; i++) {
      const url = `${BASE_URL}/media/tv/${locationState.id}/season/${locationState.seasonNum}/episode/${i}`;
      fetchList.push(fetch(url).then(async r => await r.json()));
    }
    const results = await Promise.all(fetchList);
    setResults(results);
  }

  const getCard = result => (
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
            <IonButton routerDirection="back" onClick={history.goBack}>
              <IonIcon name="arrow-back"></IonIcon>
            </IonButton>
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
