'use strict';

function withCanvas() {

  this.setupCanvas = function() {
    this.attr.width = document.documentElement.clientWidth;
    this.attr.height = document.documentElement.clientHeight;
    this.attr.centerX = this.attr.width / 2;
    this.attr.centerY = this.attr.height / 2;

    this.node.width = this.attr.width;
    this.node.height = this.attr.height;
    this.attr.context = this.node.getContext('2d');
  };

  this.drawCircle = function(options) {
    options = options || {};
    var context = this.attr.context;
    var eccentricity = options.eccentricity || 0;

    context.save();
    context.translate(options.x, options.y);
    context.scale(1, 1 - options.eccentricity);

    context.beginPath();
    context.arc(0, 0, options.radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fillStyle = options.fill || 'transparent';
    context.lineWidth = options.stroke || 0;
    context.strokeStyle = options.color || 'white';

    if (options.stroke) {
      context.stroke();
    }
    if (options.fill) {
      context.fill();
    }

    context.restore();
  }

  this.drawLine = function(options) {
    var context = this.attr.context;
    options = options || {};

    context.translate(0.5, 0.5);
    context.beginPath();
    context.moveTo(options.x1, options.y1);
    context.lineTo(options.x2, options.y2);
    context.lineWidth = options.stroke || 1;
    context.strokeStyle = options.color || 'white';
    context.stroke();
    context.restore();
  };

}

module.exports = withCanvas;
