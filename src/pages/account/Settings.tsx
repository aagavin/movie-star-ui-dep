import { ToggleChangeEventDetail } from '@ionic/core/dist/types/components/toggle/toggle-interface';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar
} from '@ionic/react';
import firebase, { firestore } from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../context';
import { UserSettings } from '../../declarations';

const Settings: React.FC<any> = () => {

  const [settings, setSettings] = useState<UserSettings>({});
  const context = useContext<any>(UserContext);
  
  useEffect(() => {
    // tslint:disable-next-line: no-unused-expression
    context.user && firebase.firestore().collection('settings').doc(context.user.uid).get().then(setDoc => {
      setSettings(setDoc.data());
    });
  }, [context.user]);

  const saveSettings = (e: CustomEvent<ToggleChangeEventDetail>) => {
    // TMP Disable 
    // tslint:disable-next-line: no-console
    console.log(e);
    settings[e.detail.value] = e.detail.checked;
    // tslint:disable-next-line: no-unused-expression
    context.user && firestore().collection('settings').doc(context.user.uid).update(settings).then(() => console.log('updated'));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
          <IonList>
            <IonItem button>
              <IonLabel>Public Favourites</IonLabel>
              <IonToggle value="publicFav" checked={settings.publicFav} onIonChange={saveSettings} />
            </IonItem>
          </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Settings;