'use strict';

var isNumberKey = function isNumberKey(keycode) {
  return !keycode || keycode > 47 && keycode < 58 || keycode == 186;
};

var padLeft = function padLeft(num, size) {
   var s = num + '';
   while (s.length < size) {
      s = '0' + s;
   }
   return s;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

function isHoursMinsSecs(pace) {
   var _pace$split = pace.split(':');

   var _pace$split2 = slicedToArray(_pace$split, 3);

   var hours = _pace$split2[0];
   var mins = _pace$split2[1];
   var secs = _pace$split2[2];

   return hours < 24 && mins < 59 && secs < 59 && !!pace.match(/^[0-9]{2}(:[0-9]{2}){2}$/);
}

function paceToSeconds(pace) {
   return pace.split(':').map(function (str, i) {
      return +str * Math.pow(60, 2 - i);
   }).reduce(function (num, prev) {
      return num += prev;
   });
}

function secondsToPace(secs) {
   var mins = Math.floor(secs / 60);
   var hours = Math.floor(mins / 60);
   mins = mins % 60;
   secs = Math.round(secs % 60);
   return [hours, mins, secs].map(function (t) {
      return padLeft(t, 2);
   }).join(':');
}

function processForm(inputJq) {
  var paceSecondsPerK = paceToSeconds(inputJq.val()) / inputJq.data('k');
  $('input').not(inputJq).each(function () {
    var k = $(this).data('k');
    $(this).val(secondsToPace(paceSecondsPerK * k));
  });
}

function initialise() {
  $('input').keyup(function (ev) {
    if (isHoursMinsSecs($(ev.target).val()) && isNumberKey(ev.which)) {
      processForm($(ev.target));
    }
  });
  $('#1m').trigger('keyup');
}

$(document).ready(initialise);