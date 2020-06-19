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
      <IonContent className="ion-text-center">
        <IonHeader collapse="condense">
          <IonToolbar color="primary">
            <IonTitle size="large">Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
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
          <IonItem>
            <IonLabel className="settings-description">
              <strong>Note:</strong> This app will allow the user to set Biometrics and an Application passcode at the
              same time. This makes sense if not also using system PIN fallback, which this app is by default. It is
              just written this way to show how both would work together if you build the application with that option
              set to false.
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
