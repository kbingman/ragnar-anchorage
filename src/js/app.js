window.$ = require('jquery');

var dispatcher = require('./dispatcher');
var shipStore = require('./store/ship_store');
var shipUI = require('./components/ship_ui');
var shipActions = require('./actions/ship_actions');

// var shipStore = new ShipStore({
//   ships: [],
//   current: null
// });

shipUI.attachTo('[data-ship]');
shipActions.attachTo(document, {
  shipStore: shipStore
});
dispatcher.attachTo(document, {
  shipStore: shipStore
});

window.shipStore = shipStore;

module.exports = {
  shipStore: shipStore
}
