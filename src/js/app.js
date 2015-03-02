window.$ = require('jquery');

var reactiveDemo = require('./components/reactive_demo');
var dispatcher = require('./components/dispatcher');
var ShipStore = require('./store/ship_store');

reactiveDemo.attachTo('[data-button]');
dispatcher.attachTo(document);
