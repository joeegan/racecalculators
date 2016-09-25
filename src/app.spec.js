/* eslint-disable no-unused-vars, no-undef */

import React from 'react';
import { shallow, mount, render } from 'enzyme';

import App from './app';
import distances from './util/kilometre-distances';

it('Displays the same amount of inputs as the amount of distances', () => {
  expect(mount(<App />).find('input').length).toBe(Object.keys(distances).length);
});
