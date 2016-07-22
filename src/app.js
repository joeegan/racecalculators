import { isNumberKey } from './keyboard';
import {
  isHoursMinsSecs,
  paceToSeconds,
  secondsToPace,
} from './util/time';

function processForm(inputJq) {
  const paceSecondsPerK = paceToSeconds(inputJq.val()) / inputJq.data('k');
  $('input').not(inputJq).each((i, input) => {
    const k = $(input).data('k');
    $(input).val(secondsToPace(paceSecondsPerK * k));
  });
}

function initialise() {
  $('input').keyup((ev) => {
    if (isHoursMinsSecs($(ev.target).val()) && isNumberKey(ev.which)) {
      processForm($(ev.target));
    }
  });
  $('#1m').trigger('keyup');
}

$(document).ready(initialise);
