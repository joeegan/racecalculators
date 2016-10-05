import React from 'react';
import { render } from 'react-dom';
import App from './app';
import styles from './styles/styles.css';
import stopwatch from './styles/stopwatch.css';
import favicon from './favicon.ico';
import sw from './service-worker';

const register = require('serviceworker!./service-worker.js');
register({ scope: '/' })
  .then(() => console.log('Service worker caching resources'))
  .catch(err => console.log('Service worker failed to load', err));

render(<App />, document.querySelector('#root'));
