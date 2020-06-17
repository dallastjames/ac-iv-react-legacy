import React from 'react';
import { IonPage, IonHeader, IonTitle, IonContent, IonButton, IonToolbar } from '@ionic/react';
import { useAuth } from '../hooks/useAuth';

const Login: React.FC = () => {
  const { login, loading } = useAuth();

  const handleLogin = () => login();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="full" color="tertiary" onClick={handleLogin} disabled={loading}>
          Sign In
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
