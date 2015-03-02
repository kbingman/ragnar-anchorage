var flight = require('flightjs');
var withObservableState = require('flight-with-observable-state');
var withBatch = require('flight-with-batch');


function toggleButton() {
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
    console.log(this.state);
    this.node.classList.toggle('is-active', this.state.active);
  };

  this.after('initialize', function() {
    this.on('click', this.toggle);
    this.after('toggle', this.batchify('update'));


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
  toggleButton
);
