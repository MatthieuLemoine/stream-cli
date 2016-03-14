'use strict';
let config   = require('./config.json');

module.exports = {
  hello : hello,
  help  : help,
  junk  : junk
};

function hello(){
  return new Promise((resolve,reject) => {
    resolve('Hello World');
  });
}

function help(){
  return new Promise((resolve,reject) => {
    let out = '';
    config.commands.forEach(command => out += command.name+' : '+command.description+'\n');
    resolve(out);
  });
}

function junk(){
  return new Promise((resolve,reject) => {
    resolve('This is a junk command');
  });
}
