var flight = require('flightjs');
var withObservableState = require('flight-with-observable-state');
var withBatch = require('flight-with-batch');
var withCanvas = require('with-canvas');

function tacticalUI() {
  this.attributes({
    initiallyActive: false,
    counter: 0,
    ships: [
      { x: 200, y: 120, color: 'red', v: 1, angle: 30 },
      { x:600, y: 500, color: 'lime', v: 40.0, angle: 15 }
    ]
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

  this.renderShips = function() {
    window.requestAnimationFrame(this.renderShips.bind(this), this.node);
    // this.batch(this.renderShips.bind(this));

    // this.attr.context.clearRect(0, 0, this.attr.width, this.attr.height);

    // if (this.attr.counter % 120 == 0) {
    //   console.log('fps', Math.round(this.attr.counter / ((+new Date() - this.attr.start)/1000)));
    // }

    this.attr.ships.forEach(function(ship, i, ships) {
      // debugger
      // if (ship.color == 'red') {
        // this.attr.context.clearRect(ship.x-4, ship.y-4, 8, 8);
      // }

      var angle = ship.angle * Math.PI / 180 - Math.PI / 2;
      var ax = Math.cos(angle) * ship.v;
      var ay = Math.sin(angle) * ship.v;

      var next = ships[i + 1] ? ships[i + 1] : ships[0];
      var dx = ship.x - next.x;
      var dy = ship.y - next.y;
      var h = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

      this.drawCircle({
        x: ship.x,
        y: ship.y,
        radius: 2,
        stroke: 0,
        fill: ship.color
      });

      // this.drawLine({
      //   x1: ship.x,
      //   y1: ship.y,
      //   x2: ship.x + ax,
      //   y2: ship.y + ay,
      //   color: ship.color,
      //   stroke: 1
      // });

      ship.x = ship.x + ax;
      ship.y = ship.y + ay;

      if (ship.color == 'lime') {
        if (isNaN(h)) {
          ship.angle = 1;
          // console.log(isNaN(h));
        } else {
          ship.angle = (Math.asin(Math.round(dy) / h) * 180) + 180;
          // console.log(ship.color, Math.round(Math.asin(dy / h) * 1000) / 1000);
          // console.log(h);
        }
        // ship.v += 20
      }

      // console.log(ship.color, Math.round(dx * 10) / 10, Math.round(dy * 10) / 10);

      // ship.angle = Math.asin(dy / h) * 180;
      // console.log(Math.round(ship.angle));

      // ship.v += 0.005;

      this.attr.counter++
    }, this);
  };

  this.after('initialize', function() {
    this.on('click', this.toggle);
    this.after('toggle', this.batchify('update'));
    this.on(document, 'showTacticalUI', this.setupCanvas);

    this.on(document, 'showTacticalUI', function() {
      this.attr.start = +new Date();
      this.node.classList.remove('isHidden');
      this.renderShips();

      // console.log('duration', +new Date() - this.attr.start);
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
