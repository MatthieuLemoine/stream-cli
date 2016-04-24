'use strict';
const through  = require('through2');
const config   = require('./config.json');
const commands = require('./commands.js');
const chalk    = require('chalk');

module.exports = {
  handleInput,
  prompt,
};

function handleInput() {
  return through({ decodeStrings : false }, function inputStream(chunk, _, next) {
    // Remove end of line
    chunk = chunk.replace('\n', '');
    // Split command and arguments
    const splits  = chunk.split(' ');
    const command = config.commands.filter((cmd) => cmd.name === splits[0]);
    if (command.length > 0) {
      commands[command[0].handler]()
        .then((out) => {
          this.push(out);
          next();
        })
        .catch((err) => {
          this.push(err);
          next();
        });
    } else {
      this.push(`Command not found : ${chunk}`);
      next();
    }
  });
}

// Command prompt
function prompt() {
  return through({ decodeStrings : false }, function promptStream(chunk, _, next) {
    this.push(`${chunk}\n${chalk.blue(`${config.prompt} `)}`);
    next();
  });
}
