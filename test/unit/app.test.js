function convert(pace, seconds) {
  expect(paceToSeconds(pace)).toBe(seconds);
  expect(secondsToPace(seconds)).toBe(pace);
}

it('can convert pace to seconds, and vice versa', function() {
  expect(convert('00:00:01', 1));
  expect(convert('00:00:59', 59));
  expect(convert('00:01:10', 70));
  expect(convert('01:00:00', 3600));
  expect(convert('01:00:01', 3601));
  expect(convert('10:00:00', 36000));
  expect(convert('04:00:00', 3600 * 4));
  expect(convert('13:00:00', 3600 * 13));
  expect(convert('24:00:00', 3600 * 24));
  expect(convert('24:00:24', (3600 * 24) + 24));
  expect(convert('24:00:24', (3600 * 24) + 24));
  expect(convert('24:01:24', (3600 * 24) + 60 + 24));
  expect(convert('24:59:24', (3600 * 24) + (59 * 60) + 24));
});

it('converts mile seconds to kilometre seconds', function() {
  expect(mileSecondsToKSeconds(1609.344)).toEqual(1000);
  expect(mileSecondsToKSeconds(16093.44)).toEqual(10000);
});

it('only recognises correct pace format', () => {
  expect(isHoursMinsSecs('00:00:00')).toBe(true);
  expect(isHoursMinsSecs('00:00:0')).toBe(false);
  expect(isHoursMinsSecs('00:00:99')).toBe(true);
});
