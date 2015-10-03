'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var wrench = require('wrench');
var fixmyjs = require("gulp-fixmyjs");

var options = {
    src: 'src',
    dist: 'dist',
    tmp: '.tmp',
    e2e: 'e2e',
    errorHandler: function (title) {
        return function (err) {
            gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
            this.emit('end');
        };
    },
    wiredep: {
        directory: 'bower_components',
        overrides: {
            "angular-promise-tracker": {
                "main": ["./promise-tracker.js", "./promise-tracker-http-interceptor.js"]
            },
            "accounting.js": {
                "main": "./accounting.js"
            },
            "hello": {
                "main": "./dist/hello.all.js"
            }
        },
        exclude: ['bower_components/bootstrap-sass/assets/javascripts/bootstrap.js'],
        fileTypes: {
            html: {
                replace: {
                    js: '<script src="/{{filePath}}"></script>'
                }
            }
        }
    }
};

wrench.readdirSyncRecursive('./gulp').filter(function (file) {
    return (/\.(js|coffee)$/i).test(file);
}).map(function (file) {
    require('./gulp/' + file)(options);
});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('fixmyjs', function () {

    return gulp.src("./src/**/*.js")
        .pipe(fixmyjs({
            // JSHint settings here
        }))
        .pipe(gulp.dest("./src"));
});
