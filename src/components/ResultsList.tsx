import { IonImg, IonItem, IonLabel, IonList, IonThumbnail } from '@ionic/react';
import React from 'react';
import { withRouter } from 'react-router';
import { BASE_IMG } from '../declarations';

interface ResultsListProps {
  catogery?: string,
  history?: any,
  location?: any,
  match?: any,
  results: [],
  staticContext?: any
}

const ResultsList: React.FC<any> = (props: ResultsListProps) => (
  <IonList>
    {props.results.map((result: any) => (
      // tslint:disable-next-line: jsx-no-lambda
      <IonItem detail button key={result.id} onClick={e => { e.preventDefault(); props.history.push(`/home/media/${result.media_type || props.catogery}/${result.id}`) }}>
        <IonThumbnail slot="start">
          <IonImg src={`${BASE_IMG}/w92${result.poster_path}`} alt={`poster icon for ${result.title ? result.title : result.name}`} />
        </IonThumbnail>
        <IonLabel>{result.title ? result.title : result.name}</IonLabel>
      </IonItem>
    ))}
  </IonList>
);

export default withRouter(ResultsList);