var flight = require('flightjs');

var withBatch = require('flight-with-batch');
var withXHR = require('../mixin/with_xhr');

function dispatcher() {
  this.attributes({
    // shipStore: null
  });

  this.resetStore = function(response) {
    this.trigger(document, 'resetShips', response);
  };

  this.fetch = function() {
    this.request({ url: '/api/v1/ships' })
      .then(this.resetStore.bind(this));
  };

  this.after('initialize', function() {
    this.fetch();
  });
}

module.exports = flight.component(
  withBatch,
  withXHR,
  dispatcher
);
