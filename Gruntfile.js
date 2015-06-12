/*
 * grunt-use-automapper
 * https://github.com/tinwatchman/grunt-use-automapper
 *
 * Copyright (c) 2015 Jon Stout
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        clean: {
            tests: ['tmp']
        },

        copy: {
            testproj: {
                files: [
                    { src: 'test/fixtures/testproj/src/app.js', dest: 'tmp/testproj/src/app.js' },
                    { src: 'test/fixtures/testproj/src/control/Controller.js', dest: 'tmp/testproj/src/control/Controller.js' },
                    { src: 'test/fixtures/testproj/src/data/dataobj.js', dest: 'tmp/testproj/src/data/dataobj.js' },
                    { src: 'test/fixtures/testproj/src/model/model.js', dest: 'tmp/testproj/src/model/model.js' },
                    { src: 'test/fixtures/testproj/src/view/View.js', dest: 'tmp/testproj/src/view/View.js' }
                ]
            },
            test_manual_file_config: {
                files: [
                    { src: 'test/fixtures/testproj/src/app.js', dest: 'tmp/manual_file_config/src/app.js' },
                    { src: 'test/fixtures/testproj/src/control/Controller.js', dest: 'tmp/manual_file_config/src/control/Controller.js' },
                    { src: 'test/fixtures/testproj/src/data/dataobj.js', dest: 'tmp/manual_file_config/src/data/dataobj.js' },
                    { src: 'test/fixtures/testproj/src/model/model.js', dest: 'tmp/manual_file_config/src/model/model.js' },
                    { src: 'test/fixtures/testproj/src/view/View.js', dest: 'tmp/manual_file_config/src/view/View.js' }
                ]
            }
        },

        // Configuration to be run (and then tested).
        useAutomapper: {
            testproj: {
                options: {
                    root: 'tmp/testproj',
                    dest: 'tmp/testproj/use.json',
                    names: {
                        'tmp/testproj/**/model.js': 'Model'
                    }
                },
                files: [
                    {
                        'expand': true,
                        'src': ['tmp/testproj/**/*.js']
                    }
                ]
            },
            test_manual_file_config: {
                options: {
                    root: 'tmp/manual_file_config',
                    dest: 'tmp/manual_file_config/use.json',
                    nameStyle: 'java',
                    names: {
                        'tmp/manual_file_config/**/model.js': 'Model'
                    }
                },
                files: [
                    { src: 'tmp/manual_file_config/src/app.js' },
                    { src: 'tmp/manual_file_config/src/model/model.js' },
                    { src: 'tmp/manual_file_config/src/control/Controller.js' }
                ]
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // load tasks
    grunt.loadTasks('tasks');

    // load npm tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('test', ['clean', 'copy', 'useAutomapper', 'nodeunit', 'clean']);
    grunt.registerTask('default', ['jshint', 'test']);

};
