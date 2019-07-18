import {
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonCardContent
  } from '@ionic/react';
import React, { useState } from 'react';
import './Home.css';
import HomeList from '../components/HomeList';

const HomePage: React.FunctionComponent = () => {

  const [catogery, setCatogery] = useState('movie');

  
  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
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
