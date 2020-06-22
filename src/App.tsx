import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Tabs from './components/Tabs';
import Login from './pages/Login';
import { useAuth } from './hooks/useAuth';
import MiddlewareProvider from './middleware';

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

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" render={() => <Redirect to="/login" />} exact={true} />
          <Route path="/tabs" render={() => (isAuthenticated ? <Tabs /> : <Redirect to="/login" />)} />
          <Route path="/login" render={() => (isAuthenticated ? <Redirect to="/tabs/about" /> : <Login />)} />
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
