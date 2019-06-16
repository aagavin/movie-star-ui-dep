import { IonButtons, IonContent, IonHeader, IonItem, IonMenuButton, IonSearchbar, IonTitle, IonToolbar, IonList, IonThumbnail, IonLabel } from "@ionic/react";
import React, { useState } from 'react';
import useReactRouter from 'use-react-router';
import { BASE_IMG, BASE_URL } from "../declarations";


const SearchPage: React.FC<any> = () => {

  const [results, setResults] = useState([]);
  const { history, location, match } = useReactRouter();

  const handleSearch = async (query: string) => {
    if (query !== '') {
      const response = await fetch(`${BASE_URL}/search?q=${query}`).then(r => r.json())
      setResults(response);
    }
  }

  console.log(history);

  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar onIonChange={(e:any) => handleSearch(e.target.value)}></IonSearchbar>
        <IonList>
        {results.map((result: any) => (
          <IonItem button key={result.id} onClick={e => {e.preventDefault(); history.push(`/home/media/${result.media_type}/${result.id}`)}}>
            <IonThumbnail slot="start">
              <img src={`${BASE_IMG}/w45${result.poster_path}`} />
            </IonThumbnail>
            <IonLabel>{result.media_type === 'movie' ? result.title : result.name}</IonLabel>
          </IonItem>
        ))}
      </IonList>
      </IonContent>
    </>
  );
};

export default SearchPage;