import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Plugins, StatusBarStyle } from '@capacitor/core';
import MiddlewareProvider from './middleware';
import Tabs from './components/Tabs';
import Login from './pages/Login';
import { useAuth } from './hooks/useAuth';
import { useVault } from './hooks/useVault';
import PasscodeModal from './components/PasscodeModal';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
import './theme/app.scss';

const { StatusBar } = Plugins;
StatusBar.setStyle({ style: StatusBarStyle.Light });

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { showPasscodeDialog } = useVault();

  return (
    <IonApp>
      <PasscodeModal isOpen={showPasscodeDialog} shouldCreatePasscode={true} />
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" render={() => <Redirect to="/login" />} exact={true} />
          <Route path="/tabs" render={() => (isAuthenticated ? <Tabs /> : <Redirect to="/login" />)} />
          <Route path="/login" render={() => (isAuthenticated ? <Redirect to="/tabs/home" /> : <Login />)} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default () => (
  <MiddlewareProvider>
    <App />
  </MiddlewareProvider>
);
