import $ from 'jquery';
import { isNumberKey } from './keyboard';

const mileDistanceInMeters = 1609.344;
const mileDistanceInK = 1.609344;
const halfMarathonDistanceInK = 21.097494;
const tenMileDistanceInK = 16.0934;
const twentyMileDistanceInK = 32.1869;
const marathonDistanceInK = 42.194988;

function isHoursMinsSecs(val) {
  const split = val.split(':');
  const hours = split[0];
  const mins = split[1];
  const secs = split[2];
  if (hours > 23 || mins > 59 || secs > 59) {
    return false;
  }
  return !!val.match(/^[0-9]{2}(:[0-9]{2}){2}$/);
}

function pad(num, size) {
   let s = num + '';
   while (s.length < size) {
      s = '0' + s;
   }
   return s;
}

function paceToSeconds(str) {
   const arr = str.split(':');
   const length = arr.length;
   const hrs  = +arr[length - 3] || 0;
   const mins = +arr[length - 2];
   const secs = +arr[length - 1];
   return (hrs * 60 * 60) + (mins * 60) + secs;
}

function secondsToPace(secs) {
   let mins = Math.floor(secs / 60);
   const hours = pad(Math.floor(mins / 60), 2);
   mins = pad(mins % 60, 2);
   const seconds = pad(Math.round(secs % 60), 2);
   return `${hours}:${mins}:${seconds}`;
}

function processForm(focussedInputJq) {
   const paceSecondsPerK = paceToSeconds(focussedInputJq.val()) / focussedInputJq.data('k');
   $('input').not(focussedInputJq).each(function(){
      const k = $(this).data('k');
      $(this).val(secondsToPace(paceSecondsPerK * k));
   });
}

function initialise(){
  $('input').each(function(){
      $(this).keyup(function(ev) {
         if (isHoursMinsSecs($(this).val()) && isNumberKey(ev.which)) {
            processForm($(this));
         }
      });
  })
  $('#1m').trigger('keyup');
}

$(document).ready(initialise);
