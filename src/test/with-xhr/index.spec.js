var WithXHR = require('with-xhr');

describe('with-xhr', function(){

  beforeEach(function() {

  });

  it('should be defined', function() {
    var withXHR = new WithXHR();

    expect(withXHR.request).to.not.be.undefined;
  });

});
