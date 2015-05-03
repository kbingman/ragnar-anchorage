var shipStore = require('../../../src/js/store/ship_store');
// var shipStore;
var mockship;

describe('Store', function(){

  describe('store/ship_store', function(){

    beforeEach(function() {
      // shipStore = new ShipStore();
      mockship = {
        name: 'Funny, It Worked Last Time...'
      }
    });

    describe('shipStore#update', function(){

      it('should update the current ship', function() {
        shipStore.add(mockship);
        shipStore.find(mockship.uuid);
        shipStore.update({ price: 302 })

        expect(shipStore.state.current.price).to.be.equal(302);
      });

    });

    describe('shipStore#remove', function(){

      // it('should remove a ship', function() {
      //   shipStore.add(mockship);
      //   expect(shipStore.state.ships.length).to.equal(1);
      //
      //   shipStore.remove(mockship.uuid);
      //   expect(shipStore.state.ships.length).to.equal(0);
      // });
      //
      // it('should remove a ship if it is current', function() {
      //   shipStore.add(mockship);
      //   shipStore.find(mockship.uuid);
      //   expect(shipStore.state.ships.length).to.equal(1);
      //   expect(shipStore.state.current).to.equal(mockship);
      //
      //   shipStore.remove(mockship.uuid);
      //   expect(shipStore.state.ships.length).to.equal(0);
      //   expect(shipStore.state.current).to.be.null;
      // });

    });

    describe('shipStore#find', function(){

      // it('should find the existing ship and set it to current', function() {
      //   mockship.uuid = 'ab123e';
      //   shipStore.add(mockship);
      //
      //   shipStore.find('ab123e');
      //   expect(shipStore.state.current).to.equal(mockship);
      // });
      //
      // it('should return null if no match is found', function() {
      //   mockship.uuid = 'ab123e';
      //   shipStore.add(mockship);
      //
      //   shipStore.find('ff123f');
      //   console.log(shipStore.state.current)
      //   expect(shipStore.state.current).to.be.null;
      // });

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
