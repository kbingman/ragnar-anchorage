var withUtils = require('ship/with_utils');

describe('uuid', function(){
  var uuid;

  beforeEach(function() {
    var utils = new withUtils();
    uuid = utils.generateUUID();
  });

  it('should be 8 characters long', function() {
    expect(uuid.length).to.equal(8);
  });

  it('should be an hex string', function() {
    expect(/[abcdef\d]+/.test(uuid)).to.equal(true);
    expect(/[ghi]+/.test(uuid)).to.equal(false);
  });

  it('should not include dashes', function() {
    expect(/\-/.test(uuid)).to.equal(false);
  });

});
