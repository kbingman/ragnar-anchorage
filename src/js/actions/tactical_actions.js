var flight = require('flightjs');
var withXHR = require('../mixin/with_xhr');

function tacticalActions() {

  this.attributes({
    // shipStore: null
  });

  this.router = function() {
    var path = document.location.pathname;


    if (path.match(/^\/tactical/)) {
      console.log(path.match(/^\/tactical/))
      this.trigger(document, 'showTacticalUI');
    }
  }

  this.after('initialize', function() {
    this.router();
  });
}

module.exports = flight.component(
  tacticalActions
);
