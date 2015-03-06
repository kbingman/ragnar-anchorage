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
    current: null
  });

  this.reset = function(e, data) {
    this.mergeState({
      ships: data.starships.map(function(ship) {
        return this.calculate(ship);;
      }, this)
    });
  };

  this.add = function(e, data) {
    this.state.ships.push(this.calculate(data.ship));
    this.mergeState({
      ships: this.state.ships
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
    this.mergeState({
      ships: this.state.ships.reduce(function(memo, ship) {
        if (ship.id != id) {
          memo.push(ship);
        }
        return memo;
      }, []),
      current: this.state.current && this.state.current.id == id ? null : this.state.current
    });
  };

  this.updateShip = function(e, attributes) {
    if (!this.current) {
      return;
    }
    Object.keys(attributes).forEach(function(key) {
      this.state.current[key] = attributes[key];
    }, this);

    this.mergeState({
      current: this.calculate(this.state.current)
    });
  };

  this.change = function() {
    if (this.state.ships.length || this.state.current) {
      this.trigger('changeShips', this.state);
    }
  };

  this.after('initialize', function() {
    this.on(document, 'resetShips', this.reset);
    this.on(document, 'setCurrentShip', this.setCurrentShip);
    this.on(document, 'removeShip', this.removeShip);
    this.on(document, 'updateShip', this.updateShip);

    this.observableState.subscribe(this.change.bind(this));
  });

}

module.exports = flight.component(
  withShipCalculator,
  withObservableState,
  ShipStore
);
