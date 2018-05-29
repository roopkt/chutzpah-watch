"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const watch = require('node-watch');
const fs_1 = require("fs");
const chalkModule = require("chalk");
const chalk = chalkModule.default;
const child_process_1 = require("child_process");
let config = {};
const js = process.cwd();
const dirsToWatch = [];
const watchConfig = {
    recursive: true,
    filter: /\.tests.ts$/
};
const chutzpahParams = ['nologo'];
function run(args) {
    config = args;
    console.log(config.watchConfig);
    getDirectoriesToWatch();
    startWatchingTests();
    InformMyJob();
}
exports.run = run;
function onlyDirectory(file) {
    return fs_1.statSync(file).isDirectory()
        && config.dirsToSkip.indexOf(file) < 0;
}
function insertFileToWatchList(file) {
    dirsToWatch.push(file);
}
function onTestFileChange(_evt, name) {
    const chutzpahExe = `${config.exePath}/chutzpah.console.exe`;
    const file = path.resolve(js, name);
    const params = ' /path ' + file + chutzpahParams.map(s => ' /' + s).join('');
    var script = chutzpahExe + params;
    log(script);
    child_process_1.exec(script, function (_err, data) {
        log(chalk.bgGreen(data.toString()));
    });
}
function InformMyJob() {
    writeColor('Watching all of the tests.ts files under below directories:\n', dirsToWatch);
}
function writeColor(msg, obj) {
    log(chalk.bgGreen.bold(msg), obj || '');
}
function log(msg, obj) {
    console.log(msg, obj || '');
}
function getDirectoriesToWatch() {
    fs_1.readdirSync(js).
        filter(onlyDirectory).
        forEach(insertFileToWatchList);
}
function startWatchingTests() {
    watch(dirsToWatch, watchConfig, onTestFileChange);
}
//# sourceMappingURL=watch-testfiles.js.map