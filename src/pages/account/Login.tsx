import { IonButton, IonButtons, IonCardContent, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import useReactRouter from 'use-react-router';
import UserContext from '../../context';

const LoginPage: React.FC<any> = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { history } = useReactRouter();
  const context = useContext<any>(UserContext);

  useEffect(() => {
    if (context.user) {
      setUsername('');
      setPassword('');
      history.replace('/home');
    } 

  }, [context.user, history]);

  const handleLogin = async () => {
    await context.signInWithEmailAndPassword(username, password);
  }

  return (
    <IonPage>
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
          <IonItem id="imput-email">
            <IonLabel position="floating">Email</IonLabel>
            <IonInput required onIonChange={(e: any) => setUsername(e.target.value)} value={username} />
          </IonItem>
          <IonItem id="imput-password">
            <IonLabel position="floating">Password</IonLabel>
            <IonInput type="password" required onIonChange={(e: any) => setPassword(e.target.value)} value={password} />
          </IonItem>
          <IonButton expand="full" onClick={handleLogin}>Sign In</IonButton>
          {context.error && <p style={{ color: '#ff0000', fontWeight: 'bold', paddingLeft: '1em' }}>{context.error}</p>}
          <p>Don't have an account? <IonButton onClick={() => history.replace('/account/signup')}>Create one</IonButton></p>
        </IonCardContent>
      </IonContent>
    </IonPage>
  );
}

export default LoginPage;
