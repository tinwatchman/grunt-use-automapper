'use strict';

var grunt = require('grunt');
var pathlib = require('path');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.useAutomapper = {
    setUp: function(done) {
        done();
    },
    testproj: function(test) {
        test.expect(5);
        test.strictEqual(grunt.file.exists('tmp/testproj/use.json'), true, 'use.json file should exist');
        var useJson = grunt.file.readJSON('tmp/testproj/use.json');
        test.notStrictEqual(useJson, undefined, 'use.json file should contain data');
        test.strictEqual(useJson.Application, './src/app');
        test.strictEqual(useJson.Controller, './src/control/Controller');
        test.strictEqual(useJson.Model, './src/model/model');
        test.done();
    },
    test_manual_file_config: function(test) {
        test.expect(5);
        test.strictEqual(grunt.file.exists('tmp/manual_file_config/use.json'), true, 'use.json file should exist');
        var useJson = grunt.file.readJSON('tmp/manual_file_config/use.json');
        test.strictEqual(useJson['src.Application'], './src/app');
        test.strictEqual(useJson['src.control.Controller'], './src/control/Controller');
        test.strictEqual(useJson['src.model.Model'], './src/model/model');
        test.strictEqual(Object.keys(useJson).length, 3);
        test.done();
    }
};