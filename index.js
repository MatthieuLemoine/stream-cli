#!/usr/bin/node

'use strict';
let config   = require('./cli/config.json');
let figlet   = require('figlet');
let streams  = require('./cli/streams.js');

process.title = config.title;
process.stdin.setEncoding('utf8');
// Banner
process.stdout.write(figlet.textSync(config.banner) + '\n');
// Welcome message
process.stdout.write(config.welcome + '\n');
process.stdout.write('\n');
// Display hint message
process.stdout.write(config.hint + '\n');
// Prompt
process.stdout.write('> ');
// Main stream
process.stdin
  .pipe(streams.handleInput())
  .pipe(streams.ask())
  .pipe(process.stdout);
