var ShipStore = require('ship/store');
var shipStore = new ShipStore();

describe('Ship', function(){

  var mockship;

  describe('ship/store', function(){

    beforeEach(function() {
      mockship = {
        name: 'Funny, It Worked Last Time...'
      }
      shipStore.reset([mockship]);
    });

    describe('shipStore#ftl', function(){

      it('should update the current ship\'s ftl', function() {
        shipStore.find(mockship.uuid);
        shipStore.update({ ftl: 6 })

        expect(shipStore.state.current.ftl).to.be.equal(6);
      });

      it('should update the current ship\'s name', function() {
        shipStore.find(mockship.uuid);
        shipStore.update({ name: 'Just Read the Instructions' })

        expect(shipStore.state.current.name).to.be.equal('Just Read the Instructions');
      });

    });

    describe('shipStore#remove', function(){

      it('should remove a ship', function() {
        shipStore.remove(mockship.uuid);
        expect(shipStore.state.ships.length).to.equal(0);
      });

      it('should remove a ship if it is current', function() {
        shipStore.find(mockship.uuid);
        expect(shipStore.state.ships.length).to.equal(1);
        expect(shipStore.state.current).to.equal(mockship);

        shipStore.remove(mockship.uuid);
        expect(shipStore.state.ships.length).to.equal(0);
        expect(shipStore.state.current).to.be.null;
      });

    });

    describe('shipStore#find', function(){

      it('should find the existing ship and set it to current', function() {
        mockship.uuid = 'ab123e';
        shipStore.add(mockship);

        shipStore.find('ab123e');
        expect(shipStore.state.current).to.equal(mockship);
      });

      it('should return null if no match is found', function() {
        shipStore.find('ffffff');
        expect(shipStore.state.current).to.be.null;
      });

    });

    describe('shipStore#add', function(){

      it('should add a ship', function() {
        shipStore.add(mockship);
        expect(shipStore.state.ships[0]).to.equal(mockship);
      });

    });

    describe('shipStore#reset', function(){

      it('should correctly reset the ships', function() {
        var mockship2 = {
          name: 'Credibility Problem',
          uuid: '9abcde'
        };
        shipStore.add(mockship);
        shipStore.reset([mockship2]);

        expect(shipStore.state.ships[0]).to.be.equal(mockship2);
        expect(shipStore.state.ships.length).to.be.equal(1);
      });

    });


  });

});
