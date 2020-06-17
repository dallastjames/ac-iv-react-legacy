import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonButtons,
  IonButton,
  IonIcon
} from '@ionic/react';
import React from 'react';
import { logOut } from 'ionicons/icons';
import { useAuth } from '../hooks/useAuth';

const About: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => logout();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>About</IonTitle>
          <IonButtons slot="primary">
            <IonButton slot="icon-only" onClick={handleLogout}>
              <IonIcon icon={logOut} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList></IonList>
      </IonContent>
    </IonPage>
  );
};

export default About;
