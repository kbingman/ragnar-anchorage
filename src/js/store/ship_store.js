var flight = require('flightjs');
var withShipCalculator = require('../mixin/with_ship_calculator');
var withObservableState = require('flight-with-observable-state');
var withBatch = require('flight-with-batch');

/**
 * State Object for current ships
 */
function ShipStore() {

  this.initialState({
      ships: [],
      current: undefined
  });

  this.attributes({
    ships: [],
    current: undefined
  });

  this.reset = function(e, data) {
    this.mergeState({
      ships: data.starships.map(function(ship) {
        return this.calculate(ship);;
      }, this)
    });
  };

  this.setCurrentShip = function(e, id) {
    this.mergeState({
      current: this.state.ships.filter(function(ship) {
        return ship.id == id;
      })[0]
    });
  };

  this.removeShip = function(e, id) {
    this.reset = function(e, data) {
      this.mergeState({
        ships: this.attr.ships.reduce(function(memo, ship) {
          if (ship.id != id) {
            memo.push(ship);
          }
          return memo;
        }, []),
        current: this.attr.current && this.attr.current.id == id ? undefined : this.state.current
      });
    };
  };

  this.signalChange = function() {
      this.trigger('changeShips', this.state);
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
  withObservableState,
  ShipStore
);
