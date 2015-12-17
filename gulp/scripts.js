'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();
var BowerWebpackPlugin = require("bower-webpack-plugin");

module.exports = function (options) {
    function webpack(watch, callback) {
        var webpackOptions = {
            watch: watch,
            module: {
                preLoaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'jshint-loader' }],
                loaders: [{ test: /\.js$/, exclude: /node_modules/, loaders: ['ng-annotate', 'babel-loader'] }]
            },
            output: { filename: 'index.js' },
            plugins: [new BowerWebpackPlugin()]
        };

        if (watch) {
            webpackOptions.devtool = 'inline-source-map';
        }

        var webpackChangeHandler = function (err, stats) {
            if (err) {
                options.errorHandler('Webpack')(err);
            }
            $.util.log(stats.toString({
                colors: $.util.colors.supportsColor,
                chunks: false,
                hash: false,
                version: false
            }));
            browserSync.reload();
            if (watch) {
                watch = false;
                callback();
            }
        };

        return gulp.src(options.src + '/app/index.js')
            .pipe($.webpack(webpackOptions, null, webpackChangeHandler))
            .pipe(gulp.dest(options.tmp + '/serve/app'));
    }

    gulp.task('scripts', function () {
        return webpack(false);
    });

    gulp.task('scripts:watch', ['scripts'], function (callback) {
        return webpack(true, callback);
    });
};
