/* eslint-disable no-unused-vars */

import React from 'react';
import { shallow, mount, render } from 'enzyme';

import App from '../../src/app';
import distances from '../../src/util/kilometre-distances';

it('Displays the same amount of inputs as the amount of distances', function() {
  expect(mount(<App />).find('input').length).toBe(Object.keys(distances).length);
});

// it('adjusting inputs to valid values', () => {
//   const wrapper = mount(<App />);
//   const firstInput = wrapper.find('Row').first();
//   console.log(wrapper.instance());
//   const lastInput = wrapper.find('Row').last();
//   const originalLastInputValue = lastInput.props().value;
//   firstInput.handleChange({
//     target : {
//       value: '00:00:01',
//       dataset: {
//         distance: '0.1'
//       }
//     }
//   });
//   expect(lastInput.props().value).to.not.equal(originalLastInputValue);
// });
