'use strict';

function withUtils() {

  /**
   * Util method. Generates a unique ID
   */
  this.generateUUID = function() {
    return ('00000000' + (Math.random() * Math.pow(16, 8) << 0)
      .toString(16))
      .slice(-8)
      .replace(/\-/,0);
  }

}

module.exports = withUtils;
