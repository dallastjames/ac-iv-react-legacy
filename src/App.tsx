import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AuthProvider, AuthContext } from './middleware/contexts/AuthContext';
import Tabs from './components/Tabs';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login';

const App: React.FC = () => {
  const {
    state: { isAuthenticated }
  } = useContext(AuthContext);

  return (
    <IonApp>
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

const StateWrapper: React.FC = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default StateWrapper;
