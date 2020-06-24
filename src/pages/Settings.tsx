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
  const { authMode, setAuthMode } = useVault();
  const [biometrics, setBiometrics] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<boolean>(false);
  const [secureStorge, setSecureStorge] = useState<boolean>(false);

  useEffect(() => {
    setBiometrics(authMode === AuthMode.BiometricAndPasscode || authMode === AuthMode.BiometricOnly);
    setPasscode(authMode === AuthMode.BiometricAndPasscode || authMode === AuthMode.PasscodeOnly);
    setSecureStorge(authMode === AuthMode.SecureStorage);
  }, [authMode]);

  const toggleUseBiometrics = () => {
    handleAuthModeChange(!biometrics, passcode, secureStorge);
  };

  const toggleUsePasscode = () => {
    handleAuthModeChange(biometrics, !passcode, secureStorge);
  };

  const toggleUseSecureStorage = () => {
    handleAuthModeChange(biometrics, passcode, !secureStorge);
  };

  const handleAuthModeChange = (biometrics: boolean, passcode: boolean, secureStorge: boolean) => {
    if (secureStorge) return setAuthMode(AuthMode.SecureStorage);
    if (biometrics && passcode) return setAuthMode(AuthMode.BiometricAndPasscode);
    if (biometrics) return setAuthMode(AuthMode.BiometricOnly);
    if (passcode) return setAuthMode(AuthMode.PasscodeOnly);
    return setAuthMode(AuthMode.InMemoryOnly);
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
            <IonToggle checked={biometrics} onClick={toggleUseBiometrics} disabled={secureStorge}></IonToggle>
          </IonItem>
          <IonItem>
            <IonLabel>Application Passcode</IonLabel>
            <IonToggle checked={passcode} onClick={toggleUsePasscode} disabled={secureStorge}></IonToggle>
          </IonItem>
          <IonItem>
            <IonLabel>Secure Storage Mode</IonLabel>
            <IonToggle checked={secureStorge} onClick={toggleUseSecureStorage}></IonToggle>
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
