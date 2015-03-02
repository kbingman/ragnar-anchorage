'use strict';

function withCanvas() {
  this.setupCanvas = function() {
    this.attr.width = document.documentElement.clientWidth;
    this.attr.height = document.documentElement.clientHeight;
    this.attr.centerX = this.attr.width / 2;
    this.attr.centerY = this.attr.height / 2;

    this.node.width = this.attr.width;
    this.node.height = this.attr.height;
  }
  this.after('initialize', function() {
    this.setupCanvas();
  });
}

module.exports = withCanvas;
