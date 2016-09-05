const $ = require('jquery');
const isNumberKey = require('./keyboard').isNumberKey;
const time = require('./util/time');
const paceToSeconds = time.paceToSeconds;
const secondsToPace = time.secondsToPace;
const isHoursMinsSecs = time.isHoursMinsSecs;
const riegel = time.riegel;
const distances = require('./kilometre-distances');

function processForm(inputJq) {
  const paceSecondsPerK = paceToSeconds(inputJq.val()) / inputJq.data('k');
  $('input').removeClass('highlighted');
  inputJq.addClass('highlighted');
  $('input').not(inputJq).each((i, input) => {
    const k = $(input).data('k');
    if ($('select').val() === 'PROJECTED') {
      $(input).val(riegel(paceToSeconds(inputJq.val()), +inputJq.data('k'), k));
    } else {
      $(input).val(secondsToPace(paceSecondsPerK * k));
    }
  });
}

function buildForm() {
  $('table').html(Object.keys(distances).map((name) => {
    return `<tr>${name}<td><td><input id=${name} data-k='${distances[name]}'></input></td></tr>`;
  }));
}

function initialise() {
  buildForm();
  $('#mile').val('00:06:38');
  processForm($('#mile'));
  $('input').keyup((ev) => {
    if (isHoursMinsSecs(ev.target.value) && isNumberKey(ev.which)) {
      processForm($(ev.target));
    }
  });
  $('select').change(() => {
    processForm($('input.highlighted'));
  });
}

$(document).ready(initialise);

module.exports = { initialise };
