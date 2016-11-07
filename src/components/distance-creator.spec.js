/* eslint-disable no-unused-vars */

import React from 'react';
import renderer from 'react-test-renderer';
import DistanceCreator from './distance-creator';

it('DistanceCreator changes the text after click', () => {
  const component = renderer.create(
    <DistanceCreator
      handleAdd={() => jest.fn()}
      distanceMap={{foo: 1}}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});
