window.$ = require('jquery');

var dispatcher = require('./dispatcher');
var shipStore = require('./store/ship_store');
var shipUI = require('./components/ship_ui');

shipUI.attachTo('[data-ship]');
shipStore.attachTo(document);
dispatcher.attachTo(document);
