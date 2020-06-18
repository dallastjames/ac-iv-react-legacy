import React from 'react';
import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/react';
import { useAuth } from '../hooks/useAuth';
import './Login.scss';
import { cafe } from 'ionicons/icons';

const Login: React.FC = () => {
  const { login, loading } = useAuth();

  return (
    <IonPage className="login">
      <IonContent slot="fixed">
        <div className="login-module">
          <div className="login-module-inner">
            <IonIcon icon={cafe} color="light" />
            <IonButton onClick={login} disabled={loading} expand="block">
              Sign In
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
