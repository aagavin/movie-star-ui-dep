import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonTitle, IonToolbar, IonCardContent } from '@ionic/react';
import React, { useState, useEffect, useContext } from 'react';
import useReactRouter from 'use-react-router';

import UserContext from '../../context';

const LoginPage: React.FC<any> = props => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { history } = useReactRouter();
  const context = useContext<any>(UserContext);

  useEffect(() => {context.user && history.replace('/')}, [context.user, history]);

  const handleLogin = async () => context.signInWithEmailAndPassword(username, password);

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
          {(context.error && !context.user) && <p>{context.error}</p>}

          <p>Don't have an account? <IonButton onClick={() => history.replace('/account/signup')}>Create one</IonButton></p>
        </IonCardContent>
      </IonContent>
    </>
  );
}

export default LoginPage;
