#!/usr/bin/env node
import * as yargs from 'yargs';
import { readFileSync } from 'fs';
import { run } from './watch-testfiles';

const y = yargs
  .usage('Usage: chutzpah <command> [options]')
  .option(
    'config',
    {
      alias: 'c',
      describe: 'chutzpah-watch cli options',
      demandOption: true,
    })
  .demandOption(
    ['config'],
    'Please provide config argument to work with this tool')
  .config(
    'config',
    (configPath: string) => JSON.parse(readFileSync(configPath, 'utf-8')))
  .command({
    command: 'watch',
    describe: 'run tests in watch mode',
    handler: (argv: any) => {
      run(argv);
    },
    aliases: ['w'],
  })
  .example('chutzpah watch --config chuzpah-wath.json', 'running chutzpah-watch and reading cli options from given config file')
  .help()
  .argv;
