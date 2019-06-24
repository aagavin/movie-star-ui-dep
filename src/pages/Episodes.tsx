import React, { useEffect, useState } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonButton, IonIcon, IonCard, IonCardHeader, IonCardSubtitle, IonImg, IonCardTitle, IonCardContent, IonBadge, IonItem, IonLabel } from '@ionic/react';
import useReactRouter from 'use-react-router';
import { BASE_URL, BASE_IMG } from "../declarations";

interface LocationState {
  id: string;
  numOfEpisodes: number;
  seasonNum: number;
}

const EpisodesPage: React.FC<any> = props => {

  const [results, setResults] = useState([]);
  const { history } = useReactRouter();
  useEffect(() => {
    getResults(props.location.state)
  }, [props.location.state]);

  const getResults = async (locationState: LocationState) => {
    const fetchList = [];
    for (let i = 1; i < locationState.numOfEpisodes; i++) {
      const url = `${BASE_URL}/tv/${locationState.id}/season/${locationState.seasonNum}/episode/${i}`;
      fetchList.push(fetch(url).then(async r => await r.json()));
    }
    const results = await Promise.all(fetchList);
    console.log(results);
  }

  const getCard = (result: any) => (
    <IonCard key={result.id}>
      <IonCardHeader>
        <IonCardSubtitle><IonImg src={`${BASE_IMG}/w300${result.still_path}`} /></IonCardSubtitle>
        <IonCardTitle>{result.name}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        {result.overview}
      </IonCardContent>
    </IonCard>);

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
        {(results.length > 0) ? (
          results.map(result => getCard(result))
        ) : null}
      </IonContent>
    </>
  );
};

export default EpisodesPage;
