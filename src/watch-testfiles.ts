import * as path from 'path';
import * as watch from 'node-watch';
import { readdirSync, statSync } from 'fs';
import * as chalkModule from 'chalk';
const chalk = chalkModule.default;
import { exec } from 'child_process';

let config: ChutzpahConfig;
const js = process.cwd();
const dirsToWatch = [];

export interface ChutzpahConfig {
  watchConfig: {
    recursive: boolean;
    filter: any;
  };
  exePath: string;
  dirsToSkip: string[];
  cliOptions: any;
}

export function run(args: ChutzpahConfig) {
  config = args;
  getDirectoriesToWatch(js);
  startWatchingTests();
  informMyJob();
}

function onlyDirectory(file: string) {
  return statSync(file).isDirectory()
    && config.dirsToSkip.indexOf(file) < 0;
}

function insertFileToWatchList(file: string) {
  dirsToWatch.push(file);
}

function onTestFileChange(evt: any, name: string) {
  log(chalk.bgBlue(`Running Tests on ${name}`));
  const chutzpahExe = `${config.exePath}/chutzpah.console.exe`;
  const file = path.resolve(js, name);
  const params = ` /path  ${file} ${config.cliOptions.map((s: string) => ` /${s}`).join('')}`;
  const script = chutzpahExe + params;
  exec(script, (err: any, data: any) => {
    log(chalk.bgGreen(data.toString()));
    if (err) {
      log(chalk.bgRed(err.toString()));
    }
  });
}

function informMyJob() {
  log(chalk.bgCyan(
    '---Welcome to Chutzpah-Watch CLI---\nWatching test cases in below listed directories:\n')
    , dirsToWatch);
}

function writeColor(msg: any, obj: any) {
  log(chalk.bgGreen.bold(msg), obj || '');
}

function log(msg: any, obj?: any) {
  console.log(msg, obj || '');
}

function getDirectoriesToWatch(workingDir: string) {
  readdirSync(workingDir).
    filter(onlyDirectory).
    forEach(insertFileToWatchList);
}

function startWatchingTests() {
  const settings = {
    ...config.watchConfig,
    filter: (f: string) => new RegExp(config.watchConfig.filter).test(f),
  };
  watch(dirsToWatch, settings, onTestFileChange);
}
