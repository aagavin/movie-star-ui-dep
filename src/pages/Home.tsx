import { IonButtons, IonCardContent ,IonContent, IonHeader, IonLabel, IonMenuButton, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import HomeList from "../components/HomeList";
import './Home.css';

const HomePage: React.FC<any> = () => {

  const [catogery, setCatogery] = useState('movie');

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSegment color="primary" onIonChange={e => setCatogery(`${e.detail.value}`)}>
          <IonSegmentButton checked={catogery === 'movie'} value="movie">
            <IonLabel>Movie</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton checked={catogery === 'tv'} value="tv">
            <IonLabel>TV</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <IonCardContent>
          <HomeList catogery={catogery} />
        </IonCardContent>
      </IonContent>
    </>
  );
};

export default HomePage;
