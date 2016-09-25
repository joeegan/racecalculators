/* eslint-disable no-unused-vars, no-undef */
import { calculateDistances } from '../../src/util/distance';
import distances from '../../src/util/kilometre-distances';

it('returns an object using the SAME algorithm', () => {
  const result = calculateDistances('00:00:00', 1, 'SAME');
  expect(result.length, 'same length as our the defined distances').toBe(Object.keys(distances).length);
  expect(result[0].pace, 'sets all paces to zero seconds').toBe('00:00:00');
});

it('returns an object using the PROJECTED algorithm', () => {
  const result = calculateDistances('00:00:00', 1, 'PROJECTED');
  expect(result.length, 'same length as our the defined distances').toBe(Object.keys(distances).length);
  expect(result[0].pace, 'sets all paces to zero seconds').toBe('00:00:00');
});
