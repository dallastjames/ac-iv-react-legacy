import React, { useContext } from 'react';
import { IonPage, IonHeader, IonTitle, IonContent, IonButton, IonToolbar } from '@ionic/react';
import { lockOpen } from 'ionicons/icons';
import { AuthContext } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const { dispatch } = useContext(AuthContext);

  const handleLogin = () => dispatch({ type: 'LOGIN' });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="full" color="tertiary" onClick={handleLogin}>
          Sign In
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
