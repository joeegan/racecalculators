const $ = require('jquery');
const initialise = require('../../src/app').initialise;
const html = require('../../src/partial');

describe('Integration tests', () => {

  document.body.innerHTML = html;
  initialise();

  it('adjusting 1 mile updates the other inputs', () => {
    $('input#1m').val('00:07:38').keyup();
    expect($('input#1k').val()).toBe('00:04:45');
    expect($('input#10k').val()).toBe('00:47:26');
    expect($('input#marathon').val()).toBe('03:20:08');
  });

  it('adjusting 1k updates the other inputs', () => {
    $('input#1k').val('00:05:22').keyup();
    expect($('input#1m').val()).toBe('00:08:38');
  });

  it('adjusting 5k updates the other inputs', () => {
    $('input#5k').val('00:20:40').keyup();
    expect($('input#1m').val()).toBe('00:06:39');
  });

  it('adjusting marathon updates the other inputs', () => {
    $('input#marathon').val('02:58:00').keyup();
    expect($('input#1m').val()).toBe('00:06:47');
  });

});
