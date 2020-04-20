import React from 'react';
import { 
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonImg,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
  IonButton
} from '@ionic/react';

const MediaDetailsCard: React.FC<any> = (props: any) => (
  <IonCard id={`card-${props.result.id}`}>
    <IonCardHeader>
      <IonCardSubtitle>
        <IonImg src={props.result.image.url.replace('_V1_', `_SX${Math.floor(props.screenSize.width * .9)}_`)} alt={`poster for ${props.result.title}`} />
      </IonCardSubtitle>
      <IonCardTitle><b>{props.result.title}</b></IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
      {props.summary}
      <IonGrid align-items-start>
        <IonRow>
          <IonCol size="auto">
            <IonBadge color="light">{props.result.badge1}</IonBadge>
          </IonCol>
          <IonCol size="auto">
            <IonBadge color="light">{props.result.badge2}</IonBadge>
          </IonCol>
          <IonCol size="auto">
            <IonBadge color="light">{props.result?.badge3}</IonBadge>
          </IonCol>
        </IonRow>
      </IonGrid>

      <IonGrid>
        {props.isFav ?
          <IonButton expand="block" color="danger" onClick={() => props.removeFromFavourite(props.result.id)} >Remove as favourite</IonButton> :
          (props.context.user && <IonButton expand="block" color="primary" onClick={() => props.addToFavourite(props.result.id)}>Add to favourite</IonButton>)
        }
      </IonGrid>
    </IonCardContent>
  </IonCard>
);

export default MediaDetailsCard;
