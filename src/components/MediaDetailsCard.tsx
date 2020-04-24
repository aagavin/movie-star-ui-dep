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
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonList,
  IonItem
} from '@ionic/react';

const MediaDetailsCard: React.FC<any> = (props: any) => { 
  
  // TODO
  const getSeasonsCard = () => {
    if (props?.seasons.length > 0) {

      return (
        <IonCard>
        <IonSegment scrollable value="heart">
          {props.seasons.map(season => (
            <IonSegmentButton>{season.season}</IonSegmentButton>
          ))}

        </IonSegment>
        <IonList>
        <IonItem detail button>
          {props.seasons[1].episodes.map(ep => ep.title)}
        </IonItem>
        </IonList>
        </IonCard>
      )
    }
    return <></>
  }

  return (
  <>
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
    {getSeasonsCard()}
  </>
);

};

export default MediaDetailsCard;
