'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var argv = require('yargs').argv;
var environment = argv.env || 'development';

module.exports = function () {
    gulp.task('config', function () {
        var myConfig = require('./app.config.' + environment + '.json');

        return $.ngConstant({
            constants: myConfig,
            stream: true,
            name: 'config',
            dest: 'app.env.config.js'
        })
            .pipe(gulp.dest('src/app'));
    });
};
