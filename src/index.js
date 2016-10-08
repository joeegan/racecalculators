import React from 'react';
import { render } from 'react-dom';
import App from './app';
import app from './styles/app.css';
import stopwatch from './styles/stopwatch.css';
import algos from './styles/algos.css';
import row from './styles/row.css';
import icons from './styles/icons.css';
import favicon from './favicon.ico';
import sw from './service-worker';

const register = require('serviceworker!./service-worker.js');
register({ scope: '/pace-app/' })
  .then(() => console.log('Service worker caching resources'))
  .catch(err => console.log('Service worker failed to load', err));

render(<App />, document.querySelector('#root'));
