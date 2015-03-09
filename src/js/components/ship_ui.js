var flight = require('flightjs');
var withBatch = require('flight-with-batch');
var withHogan = require('../mixin/with_hogan');
var template = require('../../../templates/ship/_ship.hogan');

function shipUI() {
  var context;

  this.attributes({

  });

  this.render = function() {
    console.log('render', +new Date());

    this.node.innerHTML = this.renderTemplate(template, this.context);
  };

  this.update = function(e, state) {
    var id = state.current ? state.current.uuid : undefined;

    if (!state.current) {
      return;
    }

    this.context = {
      ship: state.current,
      ships: state.ships
    };

    history.pushState({ ship: id }, 'Ship: ' + id, '/ships/' + id);
    this.batch(this.render);
  };

  this.after('initialize', function() {
    this.on(document, 'changeShip', this.update);
  });

}

module.exports = flight.component(
  withBatch,
  withHogan,
  shipUI
);
