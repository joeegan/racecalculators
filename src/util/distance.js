import kilometreDistances from './kilometre-distances';
import {
  paceToSeconds,
  secondsToPace,
  riegel,
} from './time';

function calculateDistances(pace: string, distance: number, algoName: string, distances=kilometreDistances): object {

  const paceSecondsPerK = paceToSeconds(pace) / distance;
  const map = new Map()
    .set('SAME', d => secondsToPace(paceSecondsPerK * d))
    .set('PROJECTED', d => riegel(paceToSeconds(pace), +distance, d));

  return Object.keys(distances).map(d => {
    const distance = kilometreDistances[d] || (d.match(/k$/) ? parseInt(d) : milesToK(parseInt(d)));
    return {
      name: d,
      distance: distance,
      pace: map.get(algoName).call(null, distance),
    }
  }).sort((a, b) => {
    if (a.distance > b. distance) {
      return 1;
    } else if (a.distance < b.distance) {
      return -1;
    }
    return 0;
  });
}

function milesToK(milesDistance: number): number {
  return milesDistance * 1.6;
}

module.exports = { calculateDistances, milesToK };
