import React, { useState, useEffect } from 'react';
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
import { AuthMode } from '@ionic-enterprise/identity-vault';
import { logOut, lockClosed } from 'ionicons/icons';
import { useAuth } from '../hooks/useAuth';
import { useVault } from '../hooks/useVault';
import './Settings.scss';

const Settings: React.FC = () => {
  const { logout } = useAuth();
  const {
    vault: { authMode },
    setAuthMode
  } = useVault();
  const [useBiometrics, setUseBiometrics] = useState(
    authMode === AuthMode.BiometricAndPasscode || authMode === AuthMode.BiometricOnly
  );
  const [usePasscode, setUsePasscode] = useState(
    authMode === AuthMode.BiometricAndPasscode || authMode === AuthMode.PasscodeOnly
  );
  const [useSecureStorageMode, setUseSecureStorageMode] = useState(authMode === AuthMode.SecureStorage);

  const proxy = async (e: boolean) => {};

  const determineAuthMode = (): AuthMode => {
    const mode =
      useBiometrics && usePasscode
        ? AuthMode.BiometricAndPasscode
        : useBiometrics
        ? AuthMode.BiometricOnly
        : usePasscode
        ? AuthMode.PasscodeOnly
        : useSecureStorageMode
        ? AuthMode.SecureStorage
        : AuthMode.InMemoryOnly;
    return mode;
  };

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
            <IonLabel>Biometrics</IonLabel>
            <IonToggle
              checked={useBiometrics}
              onIonChange={(e) => setUseBiometrics(e.detail.checked)}
              disabled={useSecureStorageMode}
            ></IonToggle>
          </IonItem>
          <IonItem>
            <IonLabel>Application Passcode</IonLabel>
            <IonToggle
              checked={usePasscode}
              onIonChange={(e) => setUsePasscode(e.detail.checked)}
              disabled={useSecureStorageMode}
            ></IonToggle>
          </IonItem>
          <IonItem>
            <IonLabel>Secure Storage Mode</IonLabel>
            <IonToggle checked={useSecureStorageMode} onIonChange={(e) => proxy(e.detail.checked)}></IonToggle>
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
