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
  IonToast,
  IonToggle,
  IonToolbar
} from '@ionic/react';
import { firestore } from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../context';
import { UserSettings } from '../../declarations';


const Settings: React.FC<any> = () => {

  const [settings, setSettings] = useState<UserSettings>({});
  const [doUpdate, setDoUpdate] = useState<boolean>(false);
  const [showToggle, setShowToggle] = useState<boolean>(false);
  const [toogleMessage] = useState<string>('Settings have been Updated');
  const context = useContext<any>(UserContext);

  useEffect(() => {
    // tslint:disable-next-line: no-unused-expression
    context.user && firestore().collection('settings').doc(context.user.uid).get().then(setDoc => {
      setSettings(setDoc.data());
      setDoUpdate(true);
    });
  }, [context.user]);

  const saveSettings = (e: CustomEvent<ToggleChangeEventDetail>) => {
    settings[e.detail.value] = e.detail.checked;
    if (doUpdate && context.user) {
      firestore().collection('settings').doc(context.user.uid).update(settings).then(() => {
        setShowToggle(true);
      });
    }
  };

  const disableToggle = () => setShowToggle(false);

  return (
    <IonPage>
      <IonToast
        isOpen={showToggle}
        message={toogleMessage}
        duration={300}
        onDidDismiss={disableToggle}
      />
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
            <IonLabel class="ion-text-wrap">
              <h2>Public Favourite</h2>
              <p>Allow other users to search and like your list of favourites</p>
            </IonLabel>
            <IonToggle value="publicFav" checked={settings.publicFav} onIonChange={saveSettings} />
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Settings;