#!/usr/bin/env node
import * as yargs from 'yargs';
import { readFileSync } from 'fs';
import { run } from './watch-testfiles';

yargs
    .config('chutzpah', configPath => JSON.parse(readFileSync(configPath, 'utf-8')))
    .command({
        command: 'watch',
        handler: (argv) => {
            // console.log(argv.test)
            run(argv);
        }
    })
    .argv
