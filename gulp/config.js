'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var argv = require('yargs').argv;
var environment = argv.env || 'local-dev';

var configTask = function () {
  var myConfig = require('./app.config.' + environment + '.json');

  return $
    .ngConstant({
      constants: myConfig,
      stream: true,
      name: 'config',
      templatePath: './gulp/tpls/constant.tpl.ejs',
    })
    .pipe($.rename('revaluateAppConfig.js'))
    .pipe(gulp.dest('src/app/config'));
};

gulp.task('config', configTask);

gulp.task('config:local', function () {
  environment = argv.env || 'localhost';
  configTask();
});

gulp.task('config:dev', function () {
  environment = argv.env || 'development';
  configTask();
});

gulp.task('config:local-dev', function () {
  environment = argv.env || 'local-dev';
  configTask();
});

gulp.task('config:prod', function () {
  environment = argv.env || 'production';
  configTask();
});
