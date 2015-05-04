var WithHogan = require('with-hogan');

describe('with-hogan', function(){

  beforeEach(function() {

  });

  it('should be defined', function() {
    var withHogan = new WithHogan();
    expect(withHogan.renderTemplate).to.not.be.undefined;
  });

});
