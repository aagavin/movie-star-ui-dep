import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonTitle, IonToolbar, IonCardContent } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { firestore } from 'firebase';
import useReactRouter from 'use-react-router';

import withFirebaseAuth from 'react-with-firebase-auth'
import { providers, firebaseAppAuth } from "../../firebaseConfig";


const LoginPage: React.FC<any> = props => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { history } = useReactRouter();

  // useEffect(() => {
  //   if (props.user) {
  //     firestore().collection('favs').doc(props.user.uid).get().then(doc => {
  //       localStorage.setItem('favs', JSON.stringify(doc.data()));
  //       // history.replace('/');
  //     });
  //   }
  //   else{
  //     localStorage.removeItem('favs');
  //   }
  // }, [props.user, history]);

  const handleLogin = async () => await props.signInWithEmailAndPassword(username, password);

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
      <IonContent>
        <IonCardContent>
          {!props.user && (
            <>
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput required onIonChange={(e: any) => setUsername(e.target.value)}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput type="password" required onIonChange={(e: any) => setPassword(e.target.value)}></IonInput>
              </IonItem>
              <IonButton expand="full" onClick={handleLogin}>Sign In</IonButton>
            </>)}
          {(props.error && !props.user) && <p>{props.error}</p>}

          {props.user && (<IonButton expand="full" onClick={props.signOut}>Sign Out</IonButton>)}

          <p>Don't have an account? <a href="#" onClick={() => history.push('/account/signup')}>Create one</a></p>
        </IonCardContent>
      </IonContent>
    </>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(LoginPage);
