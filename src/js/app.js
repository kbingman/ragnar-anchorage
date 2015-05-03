window.$ = require('jquery');

var dispatcher = require('./dispatcher');

var ship = require('ship');
var shipUI = ship.ui;
var shipActions = ship.actions;
var shipStore = ship.store;

var tacticalActions = require('./actions/tactical_actions');
var tacticalUI = require('./components/tactical_ui');

// var shipStore = new ShipStore({
//   ships: [],
//   current: null
// });
shipUI.attachTo('[data-ship]');
tacticalUI.attachTo('[data-tactical]');

dispatcher.attachTo(document, {
  shipStore: shipStore
});
shipActions.attachTo(document, {
  shipStore: shipStore
});
tacticalActions.attachTo(document, {
  // shipStore: shipStore
});

window.shipStore = shipStore;
