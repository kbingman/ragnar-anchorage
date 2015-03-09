var flight = require('flightjs');
var withShipCalculator = require('../mixin/with_ship_calculator');
var withObservableState = require('flight-with-observable-state');
var withBatch = require('flight-with-batch');

/**
 * State Object for current ships using withState and RX extensions for observation
 */
function ShipStore(state) {
  // stub: required for state stuff
  this.initialize = function(state) {
    state = state || {
      ships: [],
      current: null
    };
    this.initialState(state);
  }

  flight.compose.mixin(this, [
    flight.advice.withAdvice,
    withObservableState,
    withShipCalculator
  ]);

  this.reset = function(data) {
    this.mergeState({
      ships: data.map(function(ship) {
        return this.calculate(ship);;
      }, this)
    });
  };

  this.add = function(data) {
    this.state.ships.push(this.calculate(data));
    this.mergeState({
      ships: this.state.ships
    });
  };

  this.find = function(uuid) {
    console.log('store find', +new Date());
    this.mergeState({
      current: this.state.ships.filter(function(ship) {
        return ship.uuid == uuid;
      })[0]
    });
  };

  this.remove = function(uuid) {
    this.mergeState({
      ships: this.state.ships.reduce(function(memo, ship) {
        if (ship.uuid != uuid) {
          memo.push(ship);
        }
        return memo;
      }, []),
      current: this.state.current && this.state.current.uuid == uuid ? null : this.state.current
    });
  };

  this.update = function(attributes) {
    console.log('store update', +new Date());
    if (!this.state.current) {
      return;
    }
    Object.keys(attributes).forEach(function(key) {
      this.state.current[key] = attributes[key];
    }, this);

    this.mergeState({
      current: this.calculate(this.state.current)
    });
  };

  this.initialize(state);
}

module.exports = new ShipStore();
