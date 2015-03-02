var flight = require('flightjs');
var withUtils = require('../mixin/with_utils');

'use strict';

function withShip() {
  flight.compose.mixin(this, [withUtils]);

  this.calculate = function(ship) {
    ship.uuid = ship.uuid ||this.generateUUID;
    // ship.price = this.calculatePrice(ship);
    // ship.tonnage = this.calculateTonnage(ship);

    return ship;
  };

  this.calculateTonnage = function(ship) {
    return 0;
  };

  this.calculatePrice = function(ship) {
    return 0;
  };

}

module.exports = withShip;
