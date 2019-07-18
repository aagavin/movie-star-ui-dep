import { IonProgressBar, IonList, IonItem, IonThumbnail, IonImg, IonLabel } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { BASE_URL, BASE_IMG } from "../declarations";
import { withRouter } from "react-router";

import ResultsList from "./ResultsList";

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
    <ResultsList results={results} catogery={props.catogery} />
  );
}


export default withRouter(HomeList);