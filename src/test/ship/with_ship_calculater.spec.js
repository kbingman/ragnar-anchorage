var WithShipCalculator = require('ship/with_ship_calculator');
var shipCalculator = new WithShipCalculator();
var mockship;

describe('Ship', function(){
  describe('ship/with_ship_calculator', function(){

    beforeEach(function() {
      mockship = {
        name: 'Funny, It Worked Last Time...'
      }
      mockship = shipCalculator.calculate(mockship);
    });

    it('should calculate the ship', function() {
      expect(mockship).to.be.defined;
    });

    it('should calculate the uuid', function() {
      expect(mockship.uuid.length).to.be.equal(8);
    });

    it('should calculate the tonnage', function() {
      expect(mockship.tonnage).to.be.equal(0);
    });

    it('should calculate price', function() {
      expect(mockship.price).to.be.equal(0);
    });

    it('should generate the Universal Ship Code');

  });
});
