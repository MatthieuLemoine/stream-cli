'use strict';

module.exports = {
  repeat,
  initCap,
};

/**
 * Repeat a pattern n times
 * @method repeat
 * @param  {String}  pattern The pattern to repeat
 * @param  {Integer} n       The repeat's count
 * @return {String}
 */
function repeat(pattern, n) {
  if (n < 1) return '';
  let result = '';
  while (n > 1) {
    if (n & 1) {
      result += pattern;
    }
    n >>= 1;
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
