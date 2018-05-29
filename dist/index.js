#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const fs_1 = require("fs");
const watch_testfiles_1 = require("./watch-testfiles");
const y = yargs
    .config('config', (configPath) => JSON.parse(fs_1.readFileSync(configPath, 'utf-8')))
    .command({
    command: 'watch',
    handler: (argv) => {
        watch_testfiles_1.run(argv);
    },
})
    .argv;
//# sourceMappingURL=index.js.map