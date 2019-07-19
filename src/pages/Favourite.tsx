import React, { useState, useEffect } from 'react';
import { auth } from 'firebase';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/react';

import withFirebaseAuth from 'react-with-firebase-auth'
import { providers, firebaseAppAuth } from "../firebaseConfig";

const Favourite: React.FC<any> = props => {

  useEffect(() => {
    if (props.user) {
      console.log(props.user.ra)
    }
  }, [props.user])

  return (<>
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>Favourites</IonTitle>
      </IonToolbar>
    </IonHeader>
  </>)
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(Favourite);
