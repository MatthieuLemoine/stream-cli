#!/usr/bin/node

'use strict';
const config   = require('./cli/config.json');
const figlet   = require('figlet');
const streams  = require('./cli/streams.js');
const chalk    = require('chalk');
const initCap  = require('./cli/utils').initCap;

process.title = config.title;
process.stdin.setEncoding('utf8');
// Banner
process.stdout.write(`${figlet.textSync(config.banner)}\n`);
// Welcome message
const username = initCap(process.env.USER);
process.stdout.write(`${config.welcome} ${username}\n`);
process.stdout.write('\n');
// Display hint message
process.stdout.write(`${config.hint}\n`);
process.stdout.write('\n');
// Prompt
process.stdout.write(chalk.blue(`${config.prompt} `));
// Main stream
process.stdin
  .pipe(streams.handleInput())
  .pipe(streams.prompt())
  .pipe(process.stdout);
