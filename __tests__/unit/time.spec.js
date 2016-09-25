/* eslint-disable no-unused-vars, no-undef */

import {
  paceToSeconds,
  secondsToPace,
  isHoursMinsSecs,
  riegel,
} from '../../src/util/time';

function convertsPaceAndSeconds(pace, seconds) {
  expect(paceToSeconds(pace)).toBe(seconds);
  expect(secondsToPace(seconds)).toBe(pace);
}

it('can convert pace to seconds, and vice versa', () => {
  convertsPaceAndSeconds('00:00:01', 1);
  convertsPaceAndSeconds('00:00:59', 59);
  convertsPaceAndSeconds('00:01:10', 70);
  convertsPaceAndSeconds('01:00:00', 3600);
  convertsPaceAndSeconds('01:00:01', 3601);
  convertsPaceAndSeconds('10:00:00', 36000);
  convertsPaceAndSeconds('04:00:00', 3600 * 4);
  convertsPaceAndSeconds('13:00:00', 3600 * 13);
  convertsPaceAndSeconds('24:00:00', 3600 * 24);
  convertsPaceAndSeconds('24:00:24', (3600 * 24) + 24);
  convertsPaceAndSeconds('24:00:24', (3600 * 24) + 24);
  convertsPaceAndSeconds('24:01:24', (3600 * 24) + 60 + 24);
  convertsPaceAndSeconds('24:59:24', (3600 * 24) + (59 * 60) + 24);
});

it('only recognises correct pace format', () => {
  expect(isHoursMinsSecs('00:00:00')).toBe(true);
  expect(isHoursMinsSecs('00:00:00')).toBe(true);
  expect(isHoursMinsSecs('foo')).toBe(false);
  expect(isHoursMinsSecs('00:00:0')).toBe(false);
  expect(isHoursMinsSecs('0:00:00')).toBe(false);
  expect(isHoursMinsSecs('00:0:00')).toBe(false);
  expect(isHoursMinsSecs('00:00:60')).toBe(false);
  expect(isHoursMinsSecs('00:60:00')).toBe(false);
  expect(isHoursMinsSecs('24:00:00')).toBe(false);
  expect(isHoursMinsSecs('23:59:59')).toBe(true);
});

it('can calculate the Peter Riegel formula, predicting times for different distances', () => {
  expect(riegel(paceToSeconds('00:01:00'), 1, 5)).toBe('00:05:30');
  expect(riegel(paceToSeconds('00:01:00'), 1.609344, 5)).toBe('00:03:20');
  expect(riegel(paceToSeconds('00:01:00'), 5, 5)).toBe('00:01:00');
  expect(riegel(paceToSeconds('00:30:00'), 10, 5)).toBe('00:14:23');
});
