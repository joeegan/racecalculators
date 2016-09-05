const $ = require('jquery');
const initialise = require('../../src/app').initialise;

describe('Integration tests', () => {

  document.body.innerHTML = '<table></table>';
  initialise();

  it('adjusting 1 mile updates the other inputs', () => {
    $('input#mile').val('00:07:38').keyup();
    expect($('input#fiveK').val()).toBe('00:23:43');
    expect($('input#tenK').val()).toBe('00:47:26');
    expect($('input#marathon').val()).toBe('03:20:08');
  });

  it('adjusting 1k updates the other inputs', () => {
    $('input#k').val('00:05:22').keyup();
    expect($('input#mile').val()).toBe('00:08:38');
  });

  it('adjusting 5k updates the other inputs', () => {
    $('input#fiveK').val('00:20:40').keyup();
    expect($('input#mile').val()).toBe('00:06:39');
  });

  it('adjusting marathon updates the other inputs', () => {
    $('input#marathon').val('02:58:00').keyup();
    expect($('input#mile').val()).toBe('00:06:47');
  });

});
