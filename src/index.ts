#!/usr/bin/env node
import * as yargs from 'yargs';
import { readFileSync } from 'fs';
import { run } from './watch-testfiles';

const y = yargs
    .config('config', (configPath: string) => JSON.parse(readFileSync(configPath, 'utf-8')))
    .command({
        command: 'watch',
        handler: (argv: any) => {
            run(argv);
        },
    })
    .argv;
