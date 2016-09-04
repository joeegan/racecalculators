const $ = require('jquery');
const isNumberKey = require('./keyboard').isNumberKey;
const time = require('./util/time');
const paceToSeconds = time.paceToSeconds;
const secondsToPace = time.secondsToPace;
const isHoursMinsSecs = time.isHoursMinsSecs;
const riegel = time.riegel;


function processForm(inputJq) {
  const paceSecondsPerK = paceToSeconds(inputJq.val()) / inputJq.data('k');
  $('input').not(inputJq).each((i, input) => {
    const k = $(input).data('k');
    if ($('select').val() === 'PROJECTED') {
      $(input).val(riegel(paceToSeconds(inputJq.val()), +inputJq.data('k'), k));
    } else {
      $(input).val(secondsToPace(paceSecondsPerK * k));
    }
  });
}

function initialise() {
  $('input').keyup((ev) => {
    if (isHoursMinsSecs(ev.target.value) && isNumberKey(ev.which)) {
      processForm($(ev.target));
    }
  });
  $('#1m').trigger('keyup');
  $('select').change(() => {
    $('#1m').trigger('keyup');
  });
}

$(document).ready(initialise);

module.exports = { initialise };
