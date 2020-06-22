import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonList
} from '@ionic/react';
import React from 'react';
import { logOut } from 'ionicons/icons';
import { useAuth } from '../hooks/useAuth';

const Home: React.FC = () => {
  const { logout, user } = useAuth();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Home</IonTitle>
          <IonButtons slot="primary">
            <IonButton slot="icon-only" onClick={logout}>
              <IonIcon icon={logOut} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h2>
          Hello, {user?.firstName} {user?.lastName}!
        </h2>
        <IonList></IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
