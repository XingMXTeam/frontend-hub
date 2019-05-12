'use strict';
const gulp = require('gulp');
const istanbul = require('gulp-istanbul');

gulp.task('coverage', function (done) {
    gulp.src(['src/**/*.js'])
        .pipe(istanbul({
            coverageVariable: '__coverage__'
        }))
        .pipe(gulp.dest('./test/src'));

    gulp.src(['src/**/*.html'])
        .pipe(gulp.dest('./test/src'));

    gulp.src(['src/**/*.css'])
        .pipe(gulp.dest('./test/src'));
    done()
});