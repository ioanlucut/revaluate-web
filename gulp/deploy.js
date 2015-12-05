'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
    }),
    awspublish = require('gulp-awspublish'),
    argv = require('yargs').argv,
    environment,
    myConfig,
    publisher,
    headers,
    nonIndexFilter,
    deployTask = function (environment) {
        myConfig = require('./app.config.' + environment + '.json');
        publisher = awspublish.create(myConfig.ENV.AWS);
        headers = {
            'Cache-Control': 'max-age=315360000, no-transform, public'
        };
        nonIndexFilter = $.filter(['**/*', '!**/*.html']);

        return gulp.src('dist/**/*.*')
            // gzip, Set Content-Encoding headers and add .gz extension
            .pipe(nonIndexFilter)
            .pipe(awspublish.gzip({ ext: '.gz' }))
            .pipe(nonIndexFilter.restore())
            // publisher will add Content-Length, Content-Type and headers specified above
            // If not specified it will set x-amz-acl to public-read by default
            .pipe(publisher.publish(headers))
            // create a cache file to speed up consecutive uploads
            .pipe(publisher.sync())
            .pipe(publisher.cache())
            // print upload updates to console
            .pipe(awspublish.reporter());
    };

module
    .exports = function () {
    gulp.task('deploy', function () {
        deployTask(argv.env || 'local-dev');
    });

    gulp.task('deploy:local', function () {
        deployTask(argv.env || 'localhost');
    });

    gulp.task('deploy:dev', ['build:dev'], function () {
        deployTask(argv.env || 'development');
    });

    gulp.task('deploy:dev-only', function () {
        deployTask(argv.env || 'development');
    });

    gulp.task('deploy:local-dev', function () {
        deployTask(argv.env || 'local-dev');
    });

    gulp.task('deploy:prod', function () {
        deployTask(argv.env || 'production');
    });
};
