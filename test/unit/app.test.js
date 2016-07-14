var expect = chai.expect;

function convert(pace, seconds) {
  expect(paceToSeconds(pace)).to.equal(seconds);
  expect(secondsToPace(seconds)).to.equal(pace);
}

describe('Unit tests', function() {

  it('can convert pace to seconds, and vice versa', function() {
    convert('00:00:01', 1);
    convert('00:00:59', 59);
    convert('00:01:10', 70);
    convert('01:00:00', 3600);
    convert('01:00:01', 3601);
    convert('10:00:00', 36000);
    convert('04:00:00', 3600 * 4);
    convert('13:00:00', 3600 * 13);
    convert('24:00:00', 3600 * 24);
    convert('24:00:24', (3600 * 24) + 24);
    convert('24:00:24', (3600 * 24) + 24);
    convert('24:01:24', (3600 * 24) + 60 + 24);
    convert('24:59:24', (3600 * 24) + (59 * 60) + 24);
  });

  it('converts mile seconds to kilometre seconds', function() {
    expect(mileSecondsToKSeconds(1609.344)).to.equal(1000);
    expect(mileSecondsToKSeconds(16093.44)).to.equal(10000);
    expect(mileSecondsToKSeconds(160934.4)).to.equal(100000);
    expect(mileSecondsToKSeconds(1609344)).to.equal(1000000);
    expect(mileSecondsToKSeconds(1609.344 * 2)).to.equal(1000 * 2);
    expect(mileSecondsToKSeconds(1609.344 * 50)).to.equal(1000 * 50);
    expect(mileSecondsToKSeconds(1609.344 * 500)).to.equal(1000 * 500);
    expect(mileSecondsToKSeconds(1609.344 * 5000)).to.equal(1000 * 5000);
    expect(mileSecondsToKSeconds(1609.344 * 500000)).to.equal(1000 * 500000);
  });

  it('only recognises correct pace format', () => {
    expect(isHoursMinsSecs('00:00:00')).to.equal(true);
    expect(isHoursMinsSecs('foo')).to.equal(false);
    expect(isHoursMinsSecs('00:00:0')).to.equal(false);
    expect(isHoursMinsSecs('0:00:00')).to.equal(false);
    expect(isHoursMinsSecs('00:0:00')).to.equal(false);
    expect(isHoursMinsSecs('00:00:60')).to.equal(false);
    expect(isHoursMinsSecs('00:60:00')).to.equal(false);
    expect(isHoursMinsSecs('24:00:00')).to.equal(false);
  });

});
