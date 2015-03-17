var flight = require('flightjs');
var withBatch = require('flight-with-batch');
var withHogan = require('../mixin/with_hogan');
var template = require('../../../templates/ship/_ship.hogan');

function shipUI() {

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

  this.up = function(e) {
    console.log('up method');
  }

  this.defer = function(e) {
    e.preventDefault();

    var method = Object.keys(e.target.dataset)[0];

    if(method && this[method]) {
      this[method](e);
    }
  };

  this.after('initialize', function() {
    this.on(document, 'changeShip', this.update);
    this.on('click', this.defer);
  });

}

module.exports = flight.component(
  withBatch,
  withHogan,
  shipUI
);
