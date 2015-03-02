var flight = require('flightjs');
var withShipCalculator = require('../mixin/with_ship_calculator');

/**
 * State Object for current ships
 */
function ShipStore() {
  flight.compose.mixin(this, [withShipCalculator]);

  this.ships = [];

  this.reset = function(ships) {
    this.ships = ships.map(function(ship) {
      return this.calculate(ship);;
    }, this);

    $(document).trigger('changeShips');
  };

  this.setCurrentShip = function(id) {
    this.current = this.ships.filter(function(ship) {
      return ship.id == id;
    })[0];

    $(document).trigger('changeShips');
  };

  this.removeShip = function(id) {
    this.ships = this.ships.reduce(function(memo, ship) {
      if (ship.id != id) {
        memo.push(ship);
      }
      return memo;
    }, []);
    if (this.current && this.current.id == id) {
      this.current = undefined;
    }

    $(document).trigger('changeShips');
  };

}

module.exports = new ShipStore();
