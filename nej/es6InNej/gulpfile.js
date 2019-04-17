'use strict';

var gulp = require('gulp');

var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var minimist = require('minimist');
var chalk = require('chalk');

var option = {
    string: 'path',
    default: { env: process.env.NODE_ENV || './src/' }
};
var opt = minimist(process.argv.slice(2), option);
var originPath = './raw/';
var distPath = './src/';

gulp.task('babel', function () {
    opt.path = opt.path || '';
    console.warn(originPath + opt.path + '**/*.js');
    gulp.src(originPath + opt.path + '**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel()).on('error', function (e) {
            console.error(chalk.red(e));
        })
        .pipe(sourcemaps.write('.', { sourceRoot: distPath }))
        .pipe(gulp.dest(distPath + opt.path));
});