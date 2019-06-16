import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import useReactRouter from 'use-react-router';

import withFirebaseAuth from 'react-with-firebase-auth'
import { providers, firebaseAppAuth } from "../firebaseConfig";


const LoginPage: React.FC<any> = props => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { history, location, match } = useReactRouter();

  const handleLogin = async () => {
    console.log({
      username,
      password
    });

    await props.signInWithEmailAndPassword(username, password);
  };


  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent padding>
        {!props.user ? (
          <>
            <IonItem>
              <IonLabel position="floating">Username</IonLabel>
              <IonInput required onIonChange={(e: any) => setUsername(e.target.value)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput type="password" required onIonChange={(e: any) => setPassword(e.target.value)}></IonInput>
            </IonItem>
            <IonButton expand="full" onClick={handleLogin}>Sign In</IonButton>
          </>) : ''}
          {(props.error && !props.user) ? <p>{props.error}</p> : ''}

          {props.user ? (<IonButton expand="full" onClick={props.signOut}>Sign Out</IonButton>) : ''}
        
      </IonContent>
    </>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(LoginPage);
