import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import { providers, firebaseAppAuth } from "../firebaseConfig";

const LoginPage: React.FC<any> = props => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log({
      username,
      password
    });
    let response 
    try{
      response = await props.signInWithEmailAndPassword(username, password);
    }
    catch(err){
      console.log(err);
    }
    console.log('0-----------');
    console.log(response);
    console.log('0-----------');
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent padding>
        <IonItem>
          <IonLabel position="floating">Username</IonLabel>
          <IonInput required onIonChange={(e:any) => setUsername(e.target.value)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" required onIonChange={(e:any) => setPassword(e.target.value)}></IonInput>
        </IonItem>
        <IonButton expand="full" onClick={handleLogin}>Sign In</IonButton>
      </IonContent>
    </>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(LoginPage);