import React from "react";
import { IonList, IonItem, IonThumbnail, IonImg, IonLabel } from "@ionic/react";
import { withRouter } from "react-router";
import { BASE_IMG } from "../declarations";

const ResultsList: React.FunctionComponent<any> = (props: any) => (
  <IonList>
    {props.results.map((result: any) => (
      <IonItem detail button key={result.id} onClick={e => { e.preventDefault(); props.history.push(`/home/media/${result.media_type}/${result.id}`) }}>
        <IonThumbnail slot="start">
          <IonImg src={`${BASE_IMG}/w45${result.poster_path}`} />
        </IonThumbnail>
        <IonLabel>{result.title ? result.title : result.name}</IonLabel>
      </IonItem>
    ))}
  </IonList>
);

export default withRouter(ResultsList);