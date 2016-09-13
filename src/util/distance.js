import kilometreDistances from './kilometre-distances';
import {
  paceToSeconds,
  secondsToPace,
} from './time';

function calculateDistances(pace, distance) {
  const paceSecondsPerK = paceToSeconds(pace) / distance;
  return Object.keys(kilometreDistances).map((d) => ({
    name: d,
    distance: kilometreDistances[d],
    pace: secondsToPace(paceSecondsPerK * kilometreDistances[d]),
  }));
}

module.exports = { calculateDistances };
