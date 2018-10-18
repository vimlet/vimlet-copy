# Vimlet Copy

This is a tool that copy files.

## Features

* Copy files.
* Watcher to look for changes and update files on the fly.

## Installation

npm install @vimlet/copy -g

## Usage

* `copy.copy(include, output, options, callback);`

    Copy files in given pattern.
    
* `copy.watch(include, output, options);`

    Watch for file changes in given pattern.

    **options**

    `{
        "exclude": "glob patterns",
        "clean": false
    }`

    * include: Directory to look for files.
    * exclude: Used to skip files that you don't want to copy.
    * output: Directory where files will be written.
    * clean: Empty output directory before copy.

### Command mode:

* `vimlet-copy -i include -o output -e exclude -c`

    Calls copy.copy

* `vimlet-copy -i include -o output -e exclude -c -w`

    Calls copy.watch
