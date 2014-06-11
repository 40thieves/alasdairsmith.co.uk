var gulp = require('gulp')
,	util = require('gulp-util')
,	rename = require('gulp-rename')

,	sass = require('gulp-sass')
,	minifyCss = require('gulp-minify-css')
,	autoprefixer = require('gulp-autoprefixer')

,	log = util.log
;

var sassFile = 'assets/scss/style.scss'
,	sassFiles = 'assets/scss/**.scss'
,	destDir = 'assets/css'
;

gulp.task('sass', function() {
	log('Generate CSS files ' + (new Date()).toString());

	gulp.src(sassFile)
		.pipe(sass({ style: 'expanded' }))
			.pipe(autoprefixer('last 3 version', 'safari 5', 'ie 8', 'ie 9'))
		.pipe(gulp.dest(destDir))
		.pipe(rename({ suffix: '.min' }))
		.pipe(minifyCss())
		.pipe(gulp.dest(destDir));
});

gulp.task('watch', function() {
	log('Watching scss files for modifications');

	gulp.watch(sassFiles, ['sass']);
});
