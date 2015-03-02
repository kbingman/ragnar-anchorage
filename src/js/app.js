window.$ = require('jquery');

var reactiveDemo = require('./components/reactive_demo');
var dispatcher = require('./components/dispatcher');
var shipStore = require('./store/ship_store');

window.shipStore = shipStore;

reactiveDemo.attachTo('[data-button]');
dispatcher.attachTo(document, {
  shipStore: shipStore
});
