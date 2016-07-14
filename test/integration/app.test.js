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
  it('adjusting 1 k updates the other inputs', function() {
    $('input#1k').val('00:05:22').keyup();
    expect($('input#1m').val()).to.equal('00:08:38');
  });
});
