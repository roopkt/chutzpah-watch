const path = require('path');
const watch = require('node-watch');
import { readdirSync, statSync } from 'fs';
import * as chalkModule from 'chalk';
const chalk = chalkModule.default;
import { exec } from 'child_process';

let config: ChutzpahConfig = {} as ChutzpahConfig;
const js = process.cwd();
// const dirsToSkip = ['node_modules', 'node_scripts', 'interface', 'lib'];
const dirsToWatch = [];
const watchConfig = {
    recursive: true,
    filter: /\.tests.ts$/
};
const chutzpahParams = ['nologo'];

export interface ChutzpahConfig {
    watchConfig: {
        recursive: boolean,
        filter: string
    },
    exePath: string,
    dirsToSkip: string[]
}

export function run(args: ChutzpahConfig) {
    config = args;
    console.log(config.watchConfig);
    getDirectoriesToWatch();
    startWatchingTests();
    InformMyJob();
}

function onlyDirectory(file) {
    return statSync(file).isDirectory()
        && config.dirsToSkip.indexOf(file) < 0
}

function insertFileToWatchList(file) {
    dirsToWatch.push(file);
}

function onTestFileChange(_evt, name) {
    const chutzpahExe = `${config.exePath}/chutzpah.console.exe`;
    const file = path.resolve(js, name);
    const params = ' /path ' + file + chutzpahParams.map(s => ' /' + s).join('')
    var script = chutzpahExe + params;
    log(script);
    exec(script, function (_err, data) {
        log(chalk.bgGreen(data.toString()));
    });
}

function InformMyJob() {
    writeColor('Watching all of the tests.ts files under below directories:\n', dirsToWatch);
}

function writeColor(msg, obj) {
    log(chalk.bgGreen.bold(msg), obj || '');
}

function log(msg, obj?) {
    console.log(msg, obj || '');
}

function getDirectoriesToWatch() {
    readdirSync(js).
        filter(onlyDirectory).
        forEach(insertFileToWatchList);
}

function startWatchingTests() {
    watch(dirsToWatch, watchConfig, onTestFileChange);
}
