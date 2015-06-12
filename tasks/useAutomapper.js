/*
 * grunt-use-automapper
 * https://github.com/tinwatchman/grunt-use-automapper
 *
 * Copyright (c) 2015 Jon Stout
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    var Automapper = require('use-automapper');
    var pathlib = require('path');

    grunt.registerMultiTask('useAutomapper', 'Grunt task to autogenerate a config file for the use-import module from an existing project', function() {
        // Merge options
        var options = this.options({
            root: process.cwd(),
            dest: pathlib.join(process.cwd(), './use.json'),
            nameStyle: 'default',
            names: {},
            parseFiles: true
        });

        // check to make sure root and dest are absolute paths
        if (!pathlib.isAbsolute(options.root)) {
            options.root = pathlib.join(process.cwd(), options.root);
        }
        if (!pathlib.isAbsolute(options.dest)) {
            options.dest = pathlib.join(process.cwd(), options.dest);
        }

        // get files
        var files = [];
        var exists = false;

        this.filesSrc.forEach(function(filePath) {
            exists = grunt.file.exists(filePath);
            if (exists && !pathlib.isAbsolute(filePath)) {
                files.push(pathlib.join(process.cwd(), filePath));
            } else if (exists) {
                files.push(filePath);
            }
        });

        // get automapper options
        var args = {
            'rootDir': options.root,
            'outputPath': options.dest,
            'isParsingFiles': options.parseFiles
        };
        if (options.nameStyle === 'path') {
            args['isUsingPathStyleNames'] = true;
        } else if (options.nameStyle === 'java') {
            args['isUsingJavaStyleNames'] = true;
        }
        if (Object.keys(options.names).length > 0) {
            args['additionalNames'] = {};
            var paths,
                fullPath;
            for (var srcPath in options.names) {
                paths = grunt.file.match([srcPath], this.filesSrc);
                if (paths.length === 1 || (paths.length > 1 && options.nameStyle !== 'default')) {
                    paths.forEach(function(path) {
                        if (!pathlib.isAbsolute(path)) {
                            fullPath = pathlib.join(process.cwd(), path);
                        } else {
                            fullPath = path;
                        }
                        if (files.indexOf(fullPath) > -1) {
                            args['additionalNames'][fullPath] = options.names[srcPath];
                        }
                    });
                } else if (paths.length > 0) {
                    grunt.verbose.subhead(
                        'Namespace conflict -- multiple matches detected for name ' +
                        options.names[srcPath] + '.'
                    );
                    grunt.verbose.writeln('Matched files:');
                    paths.forEach(function(p) {
                        grunt.verbose.writeln('\t' + p);
                    });
                    grunt.fail.warn(
                        'Namespace conflict. Found multiple matches for name ' +
                        options.names[srcPath] + '.'
                    );
                } else {
                    grunt.fail.warn(
                        'Unable to find matching file for name ' +
                        options.names[srcPath] + '.'
                    );
                }
            }
        }

        // run task
        var done = this.async();
        var mapper = new Automapper();
        // add in logging
        mapper.setLogFunction(function(msg) {
            grunt.verbose.writeln('[use-automapper] ' + msg);
        });
        mapper.enableLogging(); // let grunt verbose flag handle output
        mapper.async.mapFiles(files, args, function(err, filePath) {
            if (err !== null) {
                done(err);
                return;
            }
            grunt.log.ok('grunt-use-automapper complete');
            grunt.log.ok('Project map saved to ' + filePath);
            done();
        });
    });
};