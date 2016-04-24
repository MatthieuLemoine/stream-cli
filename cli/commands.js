'use strict';
const config   = require('./config.json');
const utils    = require('./utils.js');
const chalk    = require('chalk');

module.exports = {
  clear,
  hello,
  help,
  junk,
  load,
};

function clear() {
  return new Promise((resolve) => {
    let stdout = '';
    const windows = process.platform.indexOf('win') === 0;
    if (windows === false) {
      stdout += '\x1B[2J';
    } else {
      const lines = process.stdout.getWindowSize()[1];
      for (let i = 0; i < lines; i++) {
        stdout += '\r\n';
      }
    }
    // Reset cursor
    stdout += '\x1B[0f';
    resolve(stdout);
  });
}

function hello() {
  return new Promise((resolve) => {
    resolve('Hello World');
  });
}

function help() {
  return new Promise((resolve) => {
    const out = config.commands.reduce(
      (prev, command) => `${prev}${chalk.green(command.name)} : ${command.description}\n`
    , '');
    resolve(out.substring(0, out.length - 1));
  });
}

function junk() {
  return new Promise((resolve) => {
    const line1 =
      `${chalk.bgRed('ERROR')} ${chalk.red(' - ', 'This is a', chalk.green('junk'), 'command')}`;
    const line2 = `${chalk.bgRed('ERROR')}${chalk.red(' - ', 'I throw an error message')}`;
    const out   = `${line1}\n${line2}`;
    resolve(out);
  });
}

function load() {
  return new Promise((resolve) => {
    const symbole = ' ';
    const end  = 100;
    const step = 1;
    for (let i = 0; i * step <= end; i++) {
      setTimeout(() => {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(
          `|${chalk.bgWhite(utils.repeat(symbole, i))}${utils.repeat(' ', end - i)}|-${i * step}%`
        );
        if (i === end) {
          resolve(' ');
        }
      }, i * 50);
    }
  });
}
