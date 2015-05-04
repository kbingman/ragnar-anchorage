window.$ = require('jquery');

var dispatcher = require('./dispatcher');

var shipUI = require('ship/ui');
var shipActions = require('ship/actions');
var ShipStore = require('ship/store');
var shipStore = new ShipStore();

var tacticalActions = require('tactical/actions');
var tacticalUI = require('tactical/ui');

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
