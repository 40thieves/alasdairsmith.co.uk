var gulp = require('gulp'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  minifyCss = require('gulp-clean-css'),
  autoprefixer = require('gulp-autoprefixer'),
  workboxBuild = require('workbox-build'),
  handlebars = require('gulp-compile-handlebars'),
  extReplace = require('gulp-ext-replace'),
  del = require('del')

gulp.task('clean', function() {
  return del('dist')
})

gulp.task('hbs', function() {
  return gulp
    .src(['src/**/*.hbs', '!src/partials/*'])
    .pipe(
      handlebars(
        { year: new Date().getFullYear() },
        {
          batch: ['src/partials']
        }
      )
    )
    .pipe(extReplace('.html'))
    .pipe(gulp.dest('dist'))
})

gulp.task('sass', function() {
  var destDir = 'dist/assets/css'
  return gulp
    .src('assets/scss/style.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 3 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(gulp.dest(destDir))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifyCss())
    .pipe(gulp.dest(destDir))
})

gulp.task('copy-assets', function() {
  return gulp
    .src('assets/{img,js}/**/*', { base: 'assets' })
    .pipe(gulp.dest('dist/assets'))
})

gulp.task('copy-root-assets', function() {
  return gulp.src('assets/root/*').pipe(gulp.dest('dist'))
})

gulp.task('copy', gulp.parallel('copy-assets', 'copy-root-assets'))

gulp.task('service-worker', function() {
  return workboxBuild.generateSW({
    globDirectory: 'dist',
    globPatterns: ['**/*.{html,js,min.css,jpg,png}'],
    swDest: 'dist/sw.js',
    runtimeCaching: [
      {
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
      }
    ]
  })
})

gulp.task('watch', function() {
  gulp.watch('assets/scss/**/**.scss', ['sass'])
})

gulp.task(
  'build',
  gulp.series('clean', 'hbs', 'sass', 'copy', 'service-worker')
)
