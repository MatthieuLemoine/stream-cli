'use strict';
let through  = require('through2');
let config   = require('./config.json');
let commands = require('./commands.js');
let chalk    = require('chalk');

module.exports = {
  handleInput : handleInput,
  prompt      : prompt
};

function handleInput(){
  return through({decodeStrings:false},function(chunk,_,next){
    // Remove end of line
    chunk = chunk.replace('\n','');
    // Split command and arguments
    let splits  = chunk.split(' ');
    let command = config.commands.filter((cmd) => cmd.name === splits[0]);
    if(command.length > 0){
      commands[command[0].handler]()
        .then((out) => {
          this.push(out);
          next();
        })
        .catch((err) =>{
          this.push(err);
          next();
        });
    }
    else{
      this.push('Command not found : ' + chunk);
      next();
    }
  });
}

// Command prompt
function prompt(){
  return through({decodeStrings:false},function(chunk,_,next){
    this.push(chunk + '\n' + chalk.blue(config.prompt + ' '));
    next();
  });
}
