/* eslint-disable no-unused-vars, no-undef */
import time from './time';
time.secondsToPace = jest.fn();
time.riegel = jest.fn();

import { calculateDistances, milesToK } from './distance';
import distances from './kilometre-distances';
import { uniq } from 'lodash';

describe(`When the 'SAME' algorithm is selected`, () => {
  const distances = {
    '1k': 1,
    '1miles': 1.6,
  }
  it('converts all paces to seconds', () => {
    const result = calculateDistances('00:00:00', 1, 'SAME', distances);
    expect(result.length, 'same length as our the defined distances').toBe(2);
    expect(time.secondsToPace).toHaveBeenCalledTimes(2);
  });
});

describe(`When the 'PROJECTED' algorithm is selected`, () => {
  const distances = {
    '1k': 1,
    '1miles': 1.6,
  }
  it('uses the riegel formula to project the distances', () => {
    const result = calculateDistances('00:00:00', 1, 'PROJECTED', distances);
    expect(result.length, 'same length as our the defined distances').toBe(2);
    expect(time.riegel).toHaveBeenCalledTimes(2);
  });
});

describe('Sorting', () => {
  it('sorts supplied distances to an ascending order', () => {
    const distances = {
      '1miles': 1.609344,
      '1k': 1,
    };
    const result = calculateDistances('00:01:00', 1, 'PROJECTED', distances);
    expect(result[0].distance).toEqual(1);
    expect(result[1].distance).toEqual(1.609344);
  });
});

it(`doesn't create results for duplicate distances`, () => {
  const distances = {
    '1miles': 1.609344,
    '1miles': 1.609344,
  };
  const result = calculateDistances('00:01:00', 1, 'PROJECTED', distances);
  expect(result[0].distance).toEqual(1.609344);
  expect(result[1]).toBeUndefined();
});

it(`allows non standard names for custom distances`, () => {
  const distances = {
    '25k': 25,
    '25miles': 40,
  };
  const result = calculateDistances('00:01:00', 1, 'PROJECTED', distances);
  expect(result[0].distance).toEqual(25);
  expect(result[1].distance).toEqual(40);
});

describe('Basic conversion', () => {
  it('can convert miles to kilometres', () => {
    expect(milesToK(1)).toEqual(1.6);
  });
});
