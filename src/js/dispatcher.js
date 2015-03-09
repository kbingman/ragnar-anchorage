var flight = require('flightjs');

function dispatcher() {
  this.attributes({
    shipStore: null
  });

  this.changeStore = function() {
    // stores forEach here?
    if (this.attr.shipStore.state) {
      this.trigger('changeShip', this.attr.shipStore.state);
    }
  };

  this.after('initialize', function() {
    this.attr.shipStore.observableState.subscribe(this.changeStore.bind(this));
  });
}

module.exports = flight.component(
  dispatcher
);
