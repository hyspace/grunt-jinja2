/*
 * grunt-jinja2
 * https://github.com/hyspace/grunt-jinja2
 *
 * Copyright (c) 2013 shan zhou
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  var path = require('path');
  var jinja2ShellPath = 'bin/jinja2_shell.py'

  grunt.registerMultiTask('jinja2', 'render jinja2 template to html using original jinja2 (in python)', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var that = this
    var options = this.options({
      context_path:'context',
      template_path:'templates'
    });
    if (!/\/$/.test(options.template_path)) options.template_path += path.sep;
    if (!/\/$/.test(options.context_path)) options.context_path += path.sep;

    // Iterate over all specified file groups.
    this.files.filter(function(f) {
        // Warn on and remove invalid source files (if nonull was set).
        var filepath = f.src[0]
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else if (filepath.indexOf(options.template_path)!==0) {
          grunt.log.warn('Source file "' + filepath + '" not in the template path.');
          return false;
        } else {
          return true;
        }
    })
    .forEach(function(f) {

      var done = that.async()

      //ignore multi src files
      var src = f.src[0];
      //get relative path
      var template_path = src.replace(options.template_path,'')
      //get context path form relative path
      var context_path = options.context_path + template_path.replace(/\.\w+$/,'.json')

      //run python command
      var child = grunt.util.spawn({
          cmd: jinja2ShellPath,
          args: ['-t', template_path, '-d', context_path, '-b', options.template_path]
      }, function (error, result, code) {
        if (error) {
          grunt.log.warn('Error occured in rendering file "' + f.dest + '". message below:');
          grunt.log.warn(error);
        }else if(result){
          grunt.file.write(f.dest, result.stdout);
          grunt.log.writeln('File "' + f.dest + '" created.');
        }
        done();
      });

    });
  });

};
