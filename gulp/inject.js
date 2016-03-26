'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');
var argv = require('yargs').argv;

// ---
// This is the script transform which adds the async attribute to the script.
// ---
var scriptTransform = function (filepath, file, i, length) {
  return '<script src="' + filepath + '" defer></script>';
};

// ---
// This is the styles transform which adds the async attribute to the script.
// ---
var styleTransform = function (filepath, file, i, length) {
  return '<link rel="stylesheet" href="' + filepath + '" async></script>';
};

var browserSync = require('browser-sync');

gulp.task('inject-reload', ['inject'], function () {
  browserSync.reload();
});

gulp.task('inject', ['scripts', 'styles'], function () {
  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/**/*.css'),
    path.join('!' + conf.paths.tmp, '/serve/app/vendor.css'),
  ], { read: false });

  var injectScripts = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/**/*.module.js'),
  ], { read: false });

  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false,
  };

  return gulp.src(path.join(conf.paths.src, '/*.html'))
    .pipe($.inject(injectStyles, _.extend({ transform: styleTransform }, injectOptions)))
    .pipe($.inject(injectScripts, _.extend({ transform: scriptTransform }, injectOptions)))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});
