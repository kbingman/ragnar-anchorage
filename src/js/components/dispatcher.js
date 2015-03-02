var flight = require('flightjs');
var ShipStore = require('../store/ship_store');

var withBatch = require('flight-with-batch');
var withXHR = require('../mixin/with_xhr');

function dispatcher() {
  this.attributes({
    shipStore: new ShipStore()
  });

  this.createStore = function(response) {
    response.starships.forEach(function(ship) {
      this.attr.shipStore.add(ship);
    }, this);

    window.shipStore = this.attr.shipStore;
  }

  this.fetch = function() {
    this.request({ url: '/api/v1/ships' })
      .then(this.createStore.bind(this));
  }

  this.after('initialize', function() {
    this.fetch();
  });
}

module.exports = flight.component(
  withBatch,
  withXHR,
  dispatcher
);
