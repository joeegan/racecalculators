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
  return !!val.match(/^[0-9]{2}(:[0-9]{2}){2}/);
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

function mileSecondsToKSeconds(mileSeconds) {
   return mileSeconds / mileDistanceInMeters * 1000;
}

function processForm(focussedInputJq) {
   if (['1k', '5k'].includes(focussedInputJq.attr('id'))) {
     var paceSecondsPerK = paceToSeconds(focussedInputJq.val());
   } else {
     var paceSecondsPerK = mileSecondsToKSeconds(paceToSeconds(focussedInputJq.val()));
   }
   $('input').not(focussedInputJq).each(function(){
      var k = $(this).data('k');
      $(this).val(secondsToPace(paceSecondsPerK * k));
   });
   // $('#1k').val(secondsToPace(paceSecondsPerK * 1));
   // $('#1m').val(secondsToPace(paceSecondsPerK * mileDistanceInK));
   // $('#5k').val(secondsToPace(paceSecondsPerK * 5));
   // $('#10k').val(secondsToPace(paceSecondsPerK * 10));
   // $('#10m').val(secondsToPace(paceSecondsPerK * tenMileDistanceInK));
   // $('#half').val(secondsToPace(paceSecondsPerK * halfMarathonDistanceInK));
   // $('#20m').val(secondsToPace(paceSecondsPerK * twentyMileDistanceInK));
   // $('#marathon').val(secondsToPace(paceSecondsPerK * marathonDistanceInK));
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

$(function() {
  initialise();
});
