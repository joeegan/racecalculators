/* eslint-disable no-unused-vars, no-undef */

import React from 'react';
import { shallow, mount, render } from 'enzyme';

import App from '../../src/app';
import distances from '../../src/util/kilometre-distances';

it('Displays the same amount of inputs as the amount of distances', () => {
  expect(mount(<App />).find('input').length).toBe(Object.keys(distances).length);
});
