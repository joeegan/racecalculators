describe('Integration tests', function() {

  before(function(done) {
    $.get('base/src/partial.html').then(((body) => {
      $('div#mocha').append(body);
      initialise();
      done();
    }));
  });

  it('adjusting 1 mile updates the other inputs', function() {
    $('input#1m').val('00:07:38').keyup();
    expect($('input#1k').val()).to.equal('00:04:45');
    expect($('input#10k').val()).to.equal('00:47:26');
    expect($('input#marathon').val()).to.equal('03:20:08');
  });

  it('adjusting 1k updates the other inputs', function() {
    $('input#1k').val('00:05:22').keyup();
    expect($('input#1m').val()).to.equal('00:08:38');
  });

  it('adjusting 5k updates the other inputs', function() {
    $('input#5k').val('00:20:40').keyup();
    expect($('input#1m').val()).to.equal('00:06:39');
  });

  it('adjusting marathon updates the other inputs', function() {
    $('input#marathon').val('02:58:00').keyup();
    expect($('input#1m').val()).to.equal('00:06:47');
  });

});
