import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useContext, useEffect } from 'react';
import useReactRouter from 'use-react-router';
import UserContext from '../../context';

const LogoutPage: React.FC<any> = () => {

  const { history } = useReactRouter();
  const context = useContext<any>(UserContext);

  useEffect(() => {
    if (context.user && history.location.pathname === '/account/logout') {
      context.signOut();
      history.replace('/home');
    }
  }, [context, context.user, history]);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Logout</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p>Logout </p>
      </IonContent>
    </IonPage>
  );
}

export default LogoutPage;
