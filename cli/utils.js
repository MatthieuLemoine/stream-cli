'use strict';

module.exports = {
  repeat : repeat
};

function repeat(pattern, count) {
    if (count < 1) return '';
    var result = '';
    while (count > 1) {
        if (count & 1) {
          result += pattern;
        }
        count >>= 1;
        pattern += pattern;
    }
    return result + pattern;
}
