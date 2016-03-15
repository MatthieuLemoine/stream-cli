'use strict';
let config   = require('./config.json');
let utils    = require('./utils.js');
let chalk    = require('chalk');

module.exports = {
  clear : clear,
  hello : hello,
  help  : help,
  junk  : junk,
  load  : load
};

function clear(){
  return new Promise((resolve,reject) => {
  	let stdout = '';
    let windows = process.platform.indexOf("win") === 0;
  	if (windows === false)
  	{
  		stdout += '\x1B[2J';
  	}
  	else
  	{
  		let lines = process.stdout.getWindowSize()[1];
  		for (let i=0; i<lines; i++)
  		{
  			stdout += '\r\n';
  		}
  	}
  	// Reset cursor
  	stdout += '\x1B[0f';
    resolve(stdout);
  });
}

function hello(){
  return new Promise((resolve,reject) => {
    resolve('Hello World');
  });
}

function help(){
  return new Promise((resolve,reject) => {
    let out = '';
    config.commands.forEach(command => out += chalk.green(command.name)+' : '+command.description+'\n');
    resolve(out.substring(0,out.length-1));
  });
}

function junk(){
  return new Promise((resolve,reject) => {
    let out = chalk.bgRed('ERROR') + chalk.red(' - ','This is a',chalk.green('junk'),'command') + '\n' +
        chalk.bgRed('ERROR') + chalk.red(' - ','I throw an error message');
    resolve(out);
  });
}

function load(){
  return new Promise((resolve,reject) => {
    let load = ' ';
    let end  = 100;
    let step = 1;
    for(let i = 0; i*step<=end; i++){
      setTimeout(() => {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write('|' + chalk.bgWhite(utils.repeat(load,i)) + utils.repeat(' ',end-i) + '|-'+ i*step +'%');
        if(i === end){
          resolve(' ');
        }
      },i*50);
    }
  });
}
