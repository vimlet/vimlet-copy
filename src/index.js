#!/usr/bin/env node

var io = require("@vimlet/io");
var path = require("path");
var glob = require("glob");
var fs = require("fs-extra");
var cli = require("@vimlet/cli").instantiate();
var watch = require("./lib/watch");



module.exports.copy = function (include, output, options, callback) {
    options = options || {};
    
    if (options.clean) {
        fs.removeSync(output);
    }
    var totalFiles = 0;
    var rootsArray = io.getFiles(include, options);
    rootsArray.forEach(function (rootObject) {
        totalFiles += rootObject.files.length;
    });
    var rootsArray = io.getFiles(include, options);
    rootsArray.forEach(function (rootObject) {
        rootObject.files.forEach(function (relativePath) {
            fs.copy(path.join(rootObject.root, relativePath), path.join(output, relativePath), function (err) {
                totalFiles--;
                if (totalFiles == 0) {
                    if (callback) {
                        callback();
                    }
                }
            });
        });
    });
};


module.exports.watch = function (include, output, options) {
    module.exports.copy(include, output, options);
    watch.watch(include, output, options);
    if (options && options.watchdirectory) {
        watch.watchDirectory(options.watchdirectory, include, function () {
            module.exports.copy(include, output, options);
        });
    }
};

// Command mode
if (!module.parent) {

    function list(value) {
        var result = value.split(",");
        for (var i = 0; i < result.length; i++) {
            result[i] = result[i].trim();
        }
        return result;
    }

    cli
        .value("-i", "--include", "Include patterns", list)
        .value("-e", "--exclude", "Exclude patterns", list)
        .value("-o", "--output", "Output path")
        .flag("-c", "--clean", "Clean output directory")
        .value("-w", "--watch", "Keeps watching for changes")
        .flag("-h", "--help", "Shows help")
        .parse(process.argv);

    var cwd = process.cwd();

    var include = cli.result.include || path.join(cwd, "**/*.*");
    var exclude = cli.result.exclude || "**node_modules**";
    var output = cli.result.output || cwd;
    var clean = cli.result.clean || false;


    var options = {};
    options.exclude = exclude;
    options.clean = clean;

    if (cli.result.help) {
        cli.printHelp();
    } else {
        if (cli.result.watch) {
            if (typeof (cli.result.watch) != "boolean") {
                options.watchdirectory = cli.result.watch;
            }
            module.exports.watch(include, output, options);
        } else {
            module.exports.copy(include, output, options);
        }
    }

}