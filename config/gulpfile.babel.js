const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');

// sass
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const { dest, MODE } = require('./paths');

// File's paths
const dirs = {
	sass: [
		'../static/sass/*.scss',
	],
	dest
};

function styles() {
	return gulp
		.src(dirs.sass)
		.pipe(sourcemaps.init())
		.pipe(sassGlob())
		.pipe(plumber(error => console.log(error.message)))
		.pipe(sass.sync())
		.pipe(autoprefixer())
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(dirs.dest));
}

function watch() {
	gulp.watch(['../static/sass/**/*.scss'], styles);
}

// SASS
gulp.task('styles', styles);
gulp.task('watch', watch);

const defaultTasks = [styles];
if (MODE === 'development') {
	defaultTasks.push(watch);
}

gulp.task('default', gulp.parallel(defaultTasks));