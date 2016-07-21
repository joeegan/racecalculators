import { padLeft } from './string';

export function isHoursMinsSecs(pace) {
  const [hours, mins, secs] = pace.split(':');
  return (hours < 24 && mins < 59 && secs < 59) &&
    !!pace.match(/^[0-9]{2}(:[0-9]{2}){2}$/);
}

export function paceToSeconds(pace) {
   return pace.split(':')
       .map((str, i) => +str * Math.pow(60, 2-i))
       .reduce((num, prev) => num += prev);
}

export function secondsToPace(secs) {
   let mins = Math.floor(secs / 60);
   const hours = Math.floor(mins / 60);
   mins = mins % 60;
   secs = Math.round(secs % 60);
   return [hours, mins, secs].map((t) => padLeft(t, 2)).join(':');
}
