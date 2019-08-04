import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonTitle, IonToolbar, IonCardContent } from '@ionic/react';
import React, { useState, useEffect, useContext } from 'react';
import useReactRouter from 'use-react-router';

import withFirebaseAuth from 'react-with-firebase-auth';
import UserContext from '../../context';
import { providers, firebaseAppAuth } from "../../firebaseConfig";


const LoginPage: React.FC<any> = props => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { history } = useReactRouter();
  const context = useContext<any>(UserContext);

  useEffect(() => {
    if (context.user) {
      history.replace('/');
    }
  }, [context.user, history]);

  const handleLogin = async () => props.signInWithEmailAndPassword(username, password);

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
          {!context.user && (
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
          {(props.error && !context.user) && <p>{props.error}</p>}

          <p>Don't have an account? <IonButton onClick={() => history.replace('/account/signup')}>Create one</IonButton></p>
        </IonCardContent>
      </IonContent>
    </>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(LoginPage);
