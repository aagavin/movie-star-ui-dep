import { IonButtons, IonContent, IonHeader, IonMenuButton, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import React, { useState } from 'react';
import { BASE_URL } from "../declarations";
import ResultsList from '../components/ResultsList';

const SearchPage: React.FC<any> = () => {

  const [results, setResults] = useState([]);

  const handleSearch = async (query: string) => {
    if (query !== '' && query.length > 3) {
      const response = await fetch(`${BASE_URL}/search/?q=${query}`).then(r => r.json())
      setResults(response);
    }
    else if (query === '') {
      setResults([]);
    }
  }

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
        <ResultsList results={results} />
      </IonContent>
    </>
  );
};

export default SearchPage;