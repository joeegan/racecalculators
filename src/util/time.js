/* eslint no-return-assign: "error" */
import { padLeft } from './string';

export function isHoursMinsSecs(pace) {
  const [hours, mins, secs] = pace.split(':');
  return (hours < 24 && mins < 60 && secs < 60) &&
    !!pace.match(/^[0-9]{2}(:[0-9]{2}){2}$/);
}

export function paceToSeconds(pace) {
  return pace.split(':')
       .map((str, i) => +str * Math.pow(60, 2 - i))
       .reduce((num, prev) => num += prev);
}

export function secondsToPace(secs) {
  const mins = Math.floor(secs / 60);
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  const seconds = Math.round(secs % 60);
  return [hours, minutes, seconds].map((t) => padLeft(t, 2)).join(':');
}
