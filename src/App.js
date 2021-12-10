import { IonApp } from '@ionic/react';
import AppRoute from './AppRoute'

import { store } from './store'
import { Provider } from 'react-redux'
import './i18n'

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

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* Theme variables */
import './theme/variables.css';
import InitializedLayout from 'InitializedLayout';

const App = () => (
  <Provider store={store}>
    <IonApp>
      <InitializedLayout>
        <AppRoute />
        <ToastContainer />
      </InitializedLayout>
    </IonApp>
  </Provider>
);

export default App;
