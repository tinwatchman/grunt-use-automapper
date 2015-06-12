# grunt-use-automapper

> Grunt task that autogenerates a config file for [`use-import`](https://www.npmjs.com/package/use-import)

A Grunt wrapper around [`use-automapper`](https://www.npmjs.com/package/use-automapper) which autogenerates a `use.json` config file for the project as part of the build process. See the [`use-import`](https://www.npmjs.com/package/use-import) and [`use-automapper`](https://www.npmjs.com/package/use-automapper) documentation for more information.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you can install this plugin with this command:

```shell
npm install grunt-use-automapper --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-use-automapper');
```

## The "useAutomapper" task

### Overview
In your project's Gruntfile, add a section named `useAutomapper` to the data object passed into `grunt.initConfig()`. For example:

```js
grunt.initConfig({
  useAutomapper: {
    your_target: {
      options: {
        nameStyle: 'path' // use path style names (see below)
      },
      files: [
        {
          expand: true,
          src: ['**/*.js', '!**/Gruntfile.js'] // include all JS files except the gruntfile
        }
      ]
    }
  }
});
```

### Options

#### options.root
Type: `String`
Default value: `process.cwd()` (i.e. the same directory the Gruntfile is in)

The root directory of the project. 

#### options.dest
Type: `String`
Default value: `use.json` in the same directory the Gruntfile is in

Specifies the path that the config file will be output to.

#### options.nameStyle
Type: `String`
Possible values: `path`, `java`
Default value: `default`

Changes the style of the names used to refer to files/modules within the `use.json` file. Both `path` and `java` will integrate the path of the file (relative to the project root) into the final name.

+ The `path` style will use a cleaned-up version of the file's path as its name (e.g. the file at `root/src/folder/MyClass.js` will be mapped to the name `src/folder/MyClass`). 
+ The `java` style will format the path as a Java-like package string (e.g. `root/src/folder/MyClass.js` becomes `src.folder.MyClass`). 
+ The default style simply refers to the file by its name without its path (e.g. `root/src/folder/MyClass.js` becomes `MyClass`).

#### options.names
Type: `Object`
Default value: `{}`

This option allows reference names for files/modules to be set directly within the Grunt config. This object is expected to be a map of *filepaths* to *names*; in other words, each key should be the path to a file being named, and each value should be the desired name. See below for an example.

#### options.parseFiles
Type: `Boolean`
Default value: `true`

Whether or not the utility should parse each JS file to look for name comments. See the [`use-automapper` documentation](https://www.npmjs.com/package/use-automapper#name-comments) for more information. Turning off this feature if it's not being used will speed up the task.

### Usage Examples

#### Setting `options.names`

```js
grunt.initConfig({
  useAutomapper: {
    target_name: {
      options: {
        names: {
          'src/folder/filename.js': 'MyClass', // this file will be referred to as 'MyClass' in the final config file

          '**/filename.js': 'MyClass',         // all files matching this glob pattern will be referred to as 'MyClass' 
                                               // in the final config file

          'src/folder/app.js': 'MyApplication' // this file will be referred to as 'MyApplication' in the final config 
                                               // file
        }
      },
      files: [
        {
          expand: true,
          src: ['**/*.js', '!**/Gruntfile.js'] // include all JS files except the gruntfile
        }
      ]
    }
  }
});
```

#### Specifying files manually

```js
grunt.initConfig({
  useAutomapper: {
    target_name: {
      options: {
      },
      files: [
        { 'src': '/src/folder/app.js' },  // no need to set the `dest` property, since this task only reads files
        { 'src': '/src/folder/file.js' },
        { 'src': '/src/folder/subfolder/file.js' },
        // ... and so on
      ]
    }
  }
});
```

#### Changing the project root directory and output file

```js
grunt.initConfig({
  useAutomapper: {
    target_name: {
      options: {
        root: 'src',   // all paths in the config file will be relative to the `src` folder
        dest: 'src/config.json'    // config will be written to the file `config.json` in the `src` folder 
      },
      files: [
        {
          expand: true,
          src: ['src/**/*.js']    // only map JS files inside of src
        }
      ]
    }
  }
});
```

## Contributing
Any and all feedback would be appreciated.
