import React from 'react';
import { IonButton } from '@ionic/react';
import { useAuth } from '../hooks/useAuth';
import './Login.scss';

const Login: React.FC = () => {
  const { login, loading } = useAuth();

  return (
    <div className="login">
      <IonButton onClick={login} disabled={loading} expand="block" color="tertiary">
        Sign In
      </IonButton>
    </div>
  );
};

export default Login;
