var flight = require('flightjs');
var withUtils = require('../mixin/with_utils');

function ShipStore() {

  this.ships = [];
  this.current = undefined;

  flight.compose.mixin(this, [withUtils]);

  return {

    add: function(ship) {
      console.log(this)
      this.ships.push(ship);
    },

    setCurrentShip: function(id) {
      this.current = array.reduce(function(memo, ship) {
        if (ship.id == id) {
          memo = ship;
        }
        return memo;
      }, undefined);
    },

  }

}

module.exports = ShipStore;
