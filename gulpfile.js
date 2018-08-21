var gulp = require('gulp')
,	util = require('gulp-util')
,	rename = require('gulp-rename')

,	sass = require('gulp-sass')
,	minifyCss = require('gulp-clean-css')
,	autoprefixer = require('gulp-autoprefixer')
,	workboxBuild = require('workbox-build')
,	handlebars = require('gulp-compile-handlebars')
,	extReplace = require('gulp-ext-replace')

,	log = util.log
;

gulp.task('hbs', function () {
	return gulp.src('src/**/index.hbs')
		.pipe(handlebars({ year: new Date().getFullYear() }, {
			batch: ['src/partials']
		}))
		.pipe(extReplace('.html'))
		.pipe(gulp.dest('dist'))
})

gulp.task('sass', function() {
	log('Generate CSS files ' + (new Date()).toString());

	var destDir = 'assets/css'
	gulp.src('assets/scss/style.scss')
		.pipe(sass({ style: 'expanded' }))
			.pipe(autoprefixer('last 3 version', 'safari 5', 'ie 8', 'ie 9'))
		.pipe(gulp.dest(destDir))
		.pipe(rename({ suffix: '.min' }))
		.pipe(minifyCss())
		.pipe(gulp.dest(destDir));
});

gulp.task('service-worker', function() {
	return workboxBuild.generateSW({
		globDirectory: '.',
		globPatterns: [
			'**/*.{js,min.css,jpg,png}',
		],
		globIgnores: [
			'node_modules/**/*',
			'gulpfile.js'
		],
		swDest: 'sw.js',
		runtimeCaching: [{
			urlPattern: new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
			handler: 'cacheFirst',
			options: {
				cacheName: 'google-fonts',
				expiration: {
					maxEntries: 30
				},
				cacheableResponse: {
					statuses: [0, 200]
				}
			}
		}]
	})
})

gulp.task('watch', function() {
	log('Watching scss files for modifications');

	gulp.watch('assets/scss/**/**.scss', ['sass']);
});

gulp.task('build', ['sass', 'service-worker']);
