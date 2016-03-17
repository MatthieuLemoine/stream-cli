#!/usr/bin/node

'use strict';
let config   = require('./cli/config.json');
let figlet   = require('figlet');
let streams  = require('./cli/streams.js');
let chalk    = require('chalk');

process.title = config.title;
process.stdin.setEncoding('utf8');
// Banner
process.stdout.write(figlet.textSync(config.banner) + '\n');
// Welcome message
let username = process.env.USER.toLowerCase().substring(0,1).toUpperCase()+process.env.USER.substring(1);
process.stdout.write(config.welcome + ' ' + username + '\n');
process.stdout.write('\n');
// Display hint message
process.stdout.write(config.hint + '\n');
process.stdout.write('\n');
// Prompt
process.stdout.write(chalk.blue(config.prompt+' '));
// Main stream
process.stdin
  .pipe(streams.handleInput())
  .pipe(streams.prompt())
  .pipe(process.stdout);
