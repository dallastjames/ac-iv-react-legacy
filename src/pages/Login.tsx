import React from 'react';
import { IonPage, IonContent, IonButton } from '@ionic/react';
import { useAuth } from '../hooks/useAuth';
import './Login.scss';
import teacup from '../assets/teacup.svg';

const Login: React.FC = () => {
  const { login, loading } = useAuth();

  return (
    <IonPage className="login">
      <IonContent slot="fixed">
        <div className="login-module">
          <div className="login-module-inner">
            <div className="login-module-logo">
              <img src={teacup} alt="tea cup" />
            </div>
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
