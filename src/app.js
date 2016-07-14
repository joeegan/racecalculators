var mileDistanceInMeters = 1609.344;
var mileDistanceInK = 1.609344;
var halfMarathonDistanceInK = 21.097494;
var tenMileDistanceInK = 16.0934;
var twentyMileDistanceInK = 32.1869;
var marathonDistanceInK = 42.194988;

var rightKeyCode = 39;
var leftKeyCode = 37;
var isNumberKey = function(keycode){
  return !keycode || (keycode > 47 && keycode < 58) || keycode == 186;
}

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
   var s = num + '';
   while (s.length < size) {
      s = "0" + s;
   }
   return s;
}

function paceToSeconds(str) {
   var arr = str.split(':');
   var length = arr.length;
   var hrs  = +arr[length - 3] || 0;
   var mins = +arr[length - 2];
   var secs = +arr[length - 1];
   return (hrs * 60 * 60) + (mins * 60) + secs;
}

function secondsToPace(secs) {
   var mins = Math.floor(secs / 60);
   var hours = pad(Math.floor(mins / 60), 2);
   mins = pad(mins % 60, 2);
   var secs = pad(Math.round(secs % 60), 2);
   return `${hours}:${mins}:${secs}`;
}

function processForm(focussedInputJq) {
   var paceSecondsPerK = paceToSeconds(focussedInputJq.val()) / focussedInputJq.data('k');
   $('input').not(focussedInputJq).each(function(){
      var k = $(this).data('k');
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
