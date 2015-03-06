var flight = require('flightjs');
var withBatch = require('flight-with-batch');
var template = require('../../../templates/ship/_ship.hogan');

function shipUI() {
  var context;

  this.attributes({

  });

  this.render = function() {
    console.log('render', +new Date());
    console.log(this.context);

    this.node.innerHTML = template.render(this.context);
  };

  this.update = function(e, state) {
    this.context = {
      ship: state.current,
      ships: state.ships
    };
    this.batch(this.render);
    console.log('update', +new Date());
  };

  this.after('initialize', function() {
    this.on(document, 'changeShips', this.update);
  });

}

module.exports = flight.component(
  withBatch,
  shipUI
);
