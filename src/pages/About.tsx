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
  IonListHeader,
  IonLabel,
  IonItem,
  IonNote
} from '@ionic/react';
import { AuthMode } from '@ionic-enterprise/identity-vault';
import { logOut } from 'ionicons/icons';
import { useAuth } from '../hooks/useAuth';
import { useVault } from '../hooks/useVault';

import './About.scss';

const About: React.FC = () => {
  const { logout, user } = useAuth();
  const { authMode, getSupportedBiometricsTypes } = useVault();
  const [biometricType, setBiometricType] = useState('');

  const onLoad = async () => {
    setBiometricType(await getSupportedBiometricsTypes());
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <IonPage className="about">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>About</IonTitle>
          <IonButtons slot="primary">
            <IonButton slot="icon-only" onClick={logout}>
              <IonIcon icon={logOut} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="about-hero">
          <h1>Ionic Auth Connect w/ Identity Vault</h1>
          <h2>React Demo Application</h2>
        </div>
        <IonList>
          <IonListHeader>Versions</IonListHeader>
          <IonItem>
            <IonLabel>Capacitor</IonLabel>
            <IonNote slot="end">2.2.0</IonNote>
          </IonItem>
          <IonItem>
            <IonLabel>Auth Connect</IonLabel>
            <IonNote slot="end">3.0.0</IonNote>
          </IonItem>
          <IonItem>
            <IonLabel>Identity Vault</IonLabel>
            <IonNote slot="end">4.2.2</IonNote>
          </IonItem>
          <IonListHeader>System</IonListHeader>
          <IonItem>
            <IonLabel>Authentication Mode</IonLabel>
            <IonNote slot="end">{AuthMode[authMode]}</IonNote>
          </IonItem>
          <IonItem>
            <IonLabel>Biometric Type</IonLabel>
            <IonNote slot="end">{biometricType}</IonNote>
          </IonItem>
          <IonListHeader>User</IonListHeader>
          <IonItem>
            <IonLabel>Email</IonLabel>
            <IonNote slot="end">{user && user.email}</IonNote>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default About;
