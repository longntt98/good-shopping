import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';

ReactDOM.render(
  <AppProvider i18n={enTranslations}>
    <App />
  </AppProvider>

  , document.getElementById('root'));

serviceWorker.unregister();