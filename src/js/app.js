window.$ = require('jquery');

var dispatcher = require('./dispatcher');
var shipStore = require('./store/ship_store');
var shipUI = require('./components/ship_ui');
var shipActions = require('./actions/ship_actions');

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
