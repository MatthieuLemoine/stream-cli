'use strict';

module.exports = {
  repeat,
  initCap,
};

function repeat(pattern, count) {
  if (count < 1) return '';
  let result = '';
  while (count > 1) {
    if (count & 1) {
      result += pattern;
    }
    count >>= 1;
    pattern += pattern;
  }
  return result + pattern;
}

/**
 * initCap transform
 * @method initCap
 * @param  {String} str
 * @return {String} initCap string
 */
function initCap(str) {
  if (!str) {
    return '';
  }
  return `${str.toLowerCase().substring(0, 1).toUpperCase()}${str.substring(1)}`;
}
