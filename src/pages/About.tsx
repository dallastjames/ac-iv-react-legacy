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
import { logOut, logoReact, logoIonic } from 'ionicons/icons';
import { useAuth } from '../hooks/useAuth';
import { useVault } from '../hooks/useVault';

import logoIdentityVault from '../assets/identity-vault.svg';
import logoAuthConnect from '../assets/auth-connect.svg';

import './About.scss';
import Squircle from '../components/Squircle';

const About: React.FC = () => {
  const { logout, user } = useAuth();
  const { authMode, getSupportedBiometricsTypes } = useVault();
  const [biometricType, setBiometricType] = useState('');

  const fetchSupportedBiometricTypes = async () => {
    setBiometricType(await getSupportedBiometricsTypes());
  };

  useEffect(() => {
    fetchSupportedBiometricTypes();
  }, []);

  return (
    <IonPage className="about">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>About</IonTitle>
          <IonButtons slot="primary">
            <IonButton slot="icon-only" onClick={logout} color="dark" role="logout">
              <IonIcon icon={logOut} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="about-hero">
          <h1>
            <IonIcon src={logoAuthConnect} />
            <IonIcon src={logoIdentityVault} />
            <Squircle icon={logoReact} color="#61dbfb" />
            <Squircle icon={logoIonic} color="#4164ff" />
          </h1>
          <h2>Auth Connect with Identity Vault</h2>
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
            <IonNote slot="end" data-testid="authMode">
              {AuthMode[authMode]}
            </IonNote>
          </IonItem>
          <IonItem>
            <IonLabel>Biometric Type</IonLabel>
            <IonNote slot="end" data-testid="biometricType">
              {biometricType}
            </IonNote>
          </IonItem>
          <IonListHeader>User</IonListHeader>
          <IonItem data-testid="email">
            <IonLabel>Email</IonLabel>
            <IonNote slot="end">{user && user.email}</IonNote>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default About;
