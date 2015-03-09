var flight = require('flightjs');
var withXHR = require('../mixin/with_xhr');

function shipActions() {
  this.attributes({
    shipStore: null
  });

  this.resetStore = function(response) {
    this.attr.shipStore.reset(response.starships);
  };

  this.fetch = function() {
    console.log('actions fetch', +new Date());
    this.request({ url: '/api/v1/ships' })
      .then(this.resetStore.bind(this))
      .then(this.router.bind(this))
      .catch(function(err) { console.log(err); });
  };

  this.router = function() {
    var path = document.location.pathname;
    var id = path.match(/^\/ships\/(\w+)/)[1];

    if (id) {
      this.attr.shipStore.find(id);
    }
  }

  this.after('initialize', function() {
    // this.on(document, 'resetShips', this.reset);
    // this.on(document, 'setCurrentShip', this.setCurrentShip);
    // this.on(document, 'removeShip', this.removeShip);
    // this.on(document, 'updateShip', this.updateShip);

    this.fetch();
  });
}

module.exports = flight.component(
  withXHR,
  shipActions
);
