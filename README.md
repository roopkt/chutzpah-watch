# Welcome to Chutzpah #

`chutzpah` cli will run tests cases in watch mode. Whenever there is change in file it will run tests against it. 

## Chutzpah-Watch.json ##
JSON file with all of the parameters required to configure runing testing in watch mode. Below is one sample for `chutzpha-watch.json` file.

```json
{
    "watchConfig": {
        "recursive": true,
        "filter": "/\\.tests.ts$/"
    },
    "exePath": "C:/temp/Chutzpah.4.3.3/tools",
    "dirsToSkip": [
        "node_modules",
        "node_scripts",
        "interface",
        "lib"
    ]
}
```

## Command to trigger test in Watch mode ##
After adding `chutzpah-watch.json` file in your directory, runbelow script.
```
chutzpah watch --config chutzpah-watch.json
```
Once you run the below script it will show below message:

`Watching all of the tests.ts files under below directories: ['dir1','dir2'...]`
