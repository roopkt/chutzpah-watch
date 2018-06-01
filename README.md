<img src='https://img.shields.io/badge/npm-v1.0-blue.svg' alt='npm-v1.0'/>

<img src='https://img.shields.io/badge/build-passing-green.svg' alt='build-passing'/>

<img src='https://img.shields.io/badge/node-%3E%3D8-blue.svg' alt='node-v8' />

<img alt='isc-license'  src='https://img.shields.io/badge/license-ISC-green.svg' />

<p style='color:green'>
<i> chutzpah-watch está mirando tus archivos...
</i>
</p>

# Welcome to Chutzpah-Watch 

[`chutzpah`](https://www.npmjs.com/package/chutzpah-watch) cli will run tests cases in watch mode. Whenever there is change in file, it will run the same test file.

## Installation

```sh
#Run below script to install globally
npm install chutzpah-watch -g
```

## Features

* Executes Typescript tests in watch mode
* Supports all of the flags given in [Chutzpah Command Line Options](https://github.com/mmanela/chutzpah/wiki/command-line-options)
* Configurable and easy option to pass configs [Chutzpah-Watch.json](#Chutzpah-Watch.json)

## Usage
Create [Chutzpah-Watch.json](#Chutzpah-Watch.json) file in your code base then run below script. 
```sh
 # Execute a script as: 
 chutzpah watch --config chutzpah-watch.json

 # OR run script with aliases:
chutzpah w -c chutzpah-watch.json
```
Once you run script, it will show below message:

`Watching test cases in below listed directories: ['dir1','dir2'...]`

Now if you change any test file and save, it will run the test automatically and display the result. 

<p>
<img src="/screen-running.png">
</p>

## Chutzpah-Watch.json ##
JSON file with all of the parameters required to configure runing test in watch mode. Below is one sample for `chutzpha-watch.json` file. Supported CLI options can be found from [Chutzpah Command Line Option](https://github.com/mmanela/chutzpah/wiki/command-line-options) 

```json
{
    "watchConfig": {
        "recursive": true,
        "filter": "(.tests|.spec).ts$"
    },
    "cliOptions": [
        "nologo",
        "openInBrowser chrome"
    ],
    "exePath": "C:/temp/Chutzpah.4.3.3/tools",
    "dirsToSkip": [
        "node_modules",
        "node_scripts",
        "interface",
        "lib"
    ]
}

```

## Dependencies

Chutzpah needs to be installed please refer to [CHUTZPAH OFFICIAL PAGE](https://github.com/mmanela/chutzpah) to download chutzpah at your desk. You can pass the chutzpah exe path in  [Chutzpah-Watch.json](#Chutzpah-Watch.json)

## How It Works
It scans the directory and filter outs the files based on the configurations given. Starts watching the changes on those files and whenever change detected then it executes chutzpah.console.exe /path `changedfile.spec.ts`

Please check [Chutzpah Command Line Option](https://github.com/mmanela/chutzpah/wiki/command-line-options) already has flags which we can pass to run chutzpah in command line.
