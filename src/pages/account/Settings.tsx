import { ToggleChangeEventDetail } from '@ionic/core/dist/types/components/toggle/toggle-interface';
import { IonButtons, IonCardContent, IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import React from 'react';

const Settings: React.FC<any> = () => {

  const setSettings = (e: CustomEvent<ToggleChangeEventDetail>) => {
    // TMP Disable 
    // tslint:disable-next-line: no-console
    console.log(e.detail.checked);
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
        <IonCardContent>
          <IonList>
            <IonItem>
              <IonLabel>Public Favourites</IonLabel>
              <IonToggle value="publicFav" onIonChange={setSettings} />
            </IonItem>
          </IonList>
        </IonCardContent>
      </IonContent>
    </IonPage>
  )
}

export default Settings;