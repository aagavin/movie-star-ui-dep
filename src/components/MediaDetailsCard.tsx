import React from "react";
import { withRouter } from "react-router";
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonBadge } from "@ionic/react";
import { BASE_IMG, MediaDetail } from "../declarations";

interface MediaDetailsProps {
  res?: MediaDetail
}

const MediaDetailsCard: React.FunctionComponent<any> = (props: MediaDetailsProps) => {

  if (!props.res) {
    return <div>Loading...</div>
  }

  const res = {
    ...props.res,
    title: props.res.title ? props.res.title : props.res.name,
    badge1: `raiting: ${props.res.vote_average}`,
    catogery: props.res.title ? 'movie' : 'tv'
  };

  if (res.catogery === 'movie') {
    res['badge2'] = `runtime: ${res.runtime}`;
    res['badge3'] = res.release_date;
  }
  else {
    res['badge2'] = res.next_episode_to_air ? `next episode: ${res.next_episode_to_air.air_date}` : '';
    res['badge3'] = '';
  }

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>
          <img src={`${BASE_IMG}/w780${res.poster_path}`} alt={`poster for ${res.title}`} />
        </IonCardSubtitle>
        <IonCardTitle><b>{res.title}</b></IonCardTitle>
      </IonCardHeader>

      <IonCardContent>{res.overview}</IonCardContent>
      <IonCardContent>
        <IonGrid align-items-start>
          <IonRow>
            <IonCol size="auto">
              <IonBadge color="light">{res.badge1}</IonBadge>
            </IonCol>
            <IonCol size="auto">
              <IonBadge color="light">{res.badge2}</IonBadge>
            </IonCol>
            <IonCol size="auto">
              <IonBadge color="light">{res.badge3}</IonBadge>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>

    </IonCard>
  )
}

export default withRouter(MediaDetailsCard);
