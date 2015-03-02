var flight = require('flightjs');
var withShipCalculator = require('../mixin/with_ship_calculator');

/**
 * State Object for current ships
 */
function ShipStore() {

  this.attributes({
    ships: [],
    current: undefined
  });

  this.reset = function(e, data) {
    console.log(data)
    this.attr.ships = data.starships.map(function(ship) {
      return this.calculate(ship);;
    }, this);
  };

  this.setCurrentShip = function(e, id) {
    this.attr.current =  this.attr.ships.filter(function(ship) {
      return ship.id == id;
    })[0];
  };

  this.removeShip = function(e, id) {
    this.attr.ships = this.attr.ships.reduce(function(memo, ship) {
      if (ship.id != id) {
        memo.push(ship);
      }
      return memo;
    }, []);

    if (this.attr.current && this.attr.current.id == id) {
      this.attr.current = undefined;
    }
  };

  this.signalChange = function() {
    this.trigger('changeShips', {
      ships: this.attr.ships,
      current: this.attr.current
    });
  };

  ['reset', 'setCurrentShip', 'removeShip'].forEach(function(method) {
    this.after(method, this.signalChange);
  }, this);

  this.after('initialize', function() {
    this.on(document, 'resetShips', this.reset);
    this.on(document, 'setCurrentShip', this.setCurrentShip);
    this.on(document, 'removeShip', this.removeShip);
  });

}

module.exports = flight.component(
  withShipCalculator,
  ShipStore
);
