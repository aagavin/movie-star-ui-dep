import { IonImg, IonItem, IonLabel, IonList, IonThumbnail } from '@ionic/react';
import React from 'react';
import { withRouter } from 'react-router';

interface ResultsListProps {
  catogery?: string,
  history?: any,
  location?: any,
  match?: any,
  results: [],
  staticContext?: any
}

const ResultsList: React.FC<any> = (props: ResultsListProps) => (
  <IonList id={`result-list-${props.catogery}`}>
     {props.results.map((result: any) => (
        // tslint:disable-next-line: jsx-no-lambda
       <IonItem detail button key={result.id} onClick={e => props.history.push(`/home/media/${result.titleType}/${result.id}`)}>
         <IonThumbnail slot="start">
           <IonImg src={result.image.url} alt={`poster icon for ${result.title}`} />
         </IonThumbnail>
         <IonLabel class="ion-text-wrap">{result.title}</IonLabel>
       </IonItem>
     ))}
  </IonList>
);

export default withRouter(ResultsList);