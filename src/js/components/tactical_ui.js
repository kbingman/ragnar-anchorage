var flight = require('flightjs');
var withObservableState = require('flight-with-observable-state');
var withBatch = require('flight-with-batch');
var withCanvas = require('../mixin/with_canvas');

function tacticalUI() {
  this.attributes({
    initiallyActive: false
  });

  // Define an instance's `initialState`
  this.initialState({
    active: false
  });

  this.toggle = function(e) {
    // Merge changes onto the state using `mergeState`
    this.mergeState({
      // Access the current state using `this.state`
      active: !this.state.active
    });
  };

  this.update = function(state) {
    this.node.classList.toggle('is-active', this.state.active);
  };

  this.renderShips = function(x, y) {
    for (var i = 0; i < 5; i++) {
      this.drawCircle({
        x: x,
        y: y,
        radius: Math.pow(2, i),
        stroke: 2,
        color: 'hsl(120, 76%, ' + (60 - i * 10) + '%)' });
    }
  };

  this.after('initialize', function() {
    this.on('click', this.toggle);
    this.after('toggle', this.batchify('update'));
    this.on(document, 'showTacticalUI', this.setupCanvas);
    this.on(document, 'showTacticalUI', function() {
      this.node.classList.remove('isHidden');
      this.renderShips(300, 300);
      this.renderShips(400, 250);
    });

    // this.on(document, 'changeShips', function(e, data) {
    //   console.log(data);
    // });

    // Subscribe to a stream of the changing state
    this.observableState.subscribe(this.update.bind(this));

    // Transition the state using `replaceState`
    // this.replaceState({
    //     active: this.attr.initiallyActive
    // });

    this.batch(this.update.bind(this));
  });
}

module.exports = flight.component(
  withObservableState,
  withBatch,
  withCanvas,
  tacticalUI
);
