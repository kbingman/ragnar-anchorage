var flight = require('flightjs');
var withCanvas = require('../mixin/with_canvas');

function toggleButton() {
  this.attributes({

  });

  this.after('initialize', function() {
    
  });
}

module.exports = flight.component(
  withCanvas,
  toggleButton
);
