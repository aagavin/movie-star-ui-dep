import { IonProgressBar, IonList, IonItem, IonThumbnail, IonImg, IonLabel } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { BASE_URL, BASE_IMG } from "../declarations";
import { withRouter } from "react-router";

const HomeList: React.FunctionComponent<any> = props => {
  const [movieResults, setMovieResults] = useState([]);
  const [tvResults, setTvResults] = useState([]);

  const getResults = async (catogery: string) => {
    fetch(`${BASE_URL}/${catogery}/upcoming`)
      .then(res => res.json())
      .then(res => {
        catogery === 'movie' ?
          setMovieResults(res) :
          setTvResults(res);
      });
  }

  useEffect(() => {
    Promise.all([
      getResults('movie'),
      getResults('tv')
    ]);
  }, []);

  const results = props.catogery === 'movie' ? movieResults : tvResults;
  if (results.length === 0) {
    return <IonProgressBar type="indeterminate" />
  }

  return (
    <IonList>
      {results.map((result: any) => (
        <IonItem detail button key={result.id} onClick={e => { e.preventDefault(); props.history.push(`/home/media/${props.catogery}/${result.id}`) }}>
          <IonThumbnail slot="start">
            <IonImg src={`${BASE_IMG}/w45${result.poster_path}`} />
          </IonThumbnail>
          <IonLabel>{props.catogery === 'movie' ? result.original_title : result.name}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}


export default withRouter(HomeList);