import kilometreDistances from './kilometre-distances';
import {
  paceToSeconds,
  secondsToPace,
  riegel,
} from './time';

function calculateDistances(pace: string, distance: number, algoName: string, distances=kilometreDistances): object {

  const paceSecondsPerK = paceToSeconds(pace) / distance;
  const map = new Map()
    .set('SAME', d => secondsToPace(paceSecondsPerK * kilometreDistances[d]))
    .set('PROJECTED', d => riegel(paceToSeconds(pace), +distance, kilometreDistances[d]));

  return Object.keys(distances).map(d => ({
    name: d,
    distance: kilometreDistances[d],
    pace: map.get(algoName).call(null, d),
  }));
}

module.exports = { calculateDistances };
