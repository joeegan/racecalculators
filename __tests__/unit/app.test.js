const time = require('../../src/util/time');
const paceToSeconds = time.paceToSeconds;
const secondsToPace = time.secondsToPace;
const isHoursMinsSecs = time.isHoursMinsSecs;

function convertsPaceAndSeconds(pace, seconds) {
  expect(paceToSeconds(pace)).toBe(seconds);
  expect(secondsToPace(seconds)).toBe(pace);
}

describe('Unit tests', () => {
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
    expect(isHoursMinsSecs('foo')).toBe(false);
    expect(isHoursMinsSecs('00:00:0')).toBe(false);
    expect(isHoursMinsSecs('0:00:00')).toBe(false);
    expect(isHoursMinsSecs('00:0:00')).toBe(false);
    expect(isHoursMinsSecs('00:00:60')).toBe(false);
    expect(isHoursMinsSecs('00:60:00')).toBe(false);
    expect(isHoursMinsSecs('24:00:00')).toBe(false);
    expect(isHoursMinsSecs('23:59:59')).toBe(true);
  });
});
