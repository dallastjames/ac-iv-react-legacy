import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonButtons,
  IonButton,
  IonIcon,
  IonToggle,
  IonItem,
  IonLabel
} from '@ionic/react';
import React, { useState } from 'react';
import { logOut, lockClosed } from 'ionicons/icons';
import { useAuth } from '../hooks/useAuth';
import './Settings.scss';

const Settings: React.FC = () => {
  const { logout } = useAuth();
  const [useBiometrics, setUseBiometrics] = useState(false);
  const [usePasscode, setUsePasscode] = useState(false);
  const [useSecureStorage, setUseSecureStorage] = useState(false);

  const authModeChanged = () => {};

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Settings</IonTitle>
          <IonButtons slot="primary">
            <IonButton slot="icon-only" onClick={logout}>
              <IonIcon icon={logOut} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Biometrics ()</IonLabel>
            <IonToggle checked={useBiometrics} onIonChange={authModeChanged}></IonToggle>
          </IonItem>
          <IonItem>
            <IonLabel>Application Passcode</IonLabel>
            <IonToggle checked={usePasscode} onIonChange={authModeChanged} disabled={useSecureStorage}></IonToggle>
          </IonItem>
          <IonItem>
            <IonLabel>Secure Storage Mode</IonLabel>
            <IonToggle checked={useSecureStorage} onIonChange={authModeChanged} disabled={useSecureStorage}></IonToggle>
          </IonItem>
          <IonItem>
            <IonLabel>Lock</IonLabel>
            <IonButton>
              <IonIcon icon={lockClosed} />
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
