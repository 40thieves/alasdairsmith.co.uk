var gulp = require('gulp'),
  rename = require('gulp-rename'),
  gulpSass = require('gulp-sass'),
  minifyCss = require('gulp-clean-css'),
  autoprefixer = require('gulp-autoprefixer'),
  workboxBuild = require('workbox-build'),
  handlebars = require('gulp-hb'),
  extReplace = require('gulp-ext-replace'),
  del = require('del')

function clean() {
  return del('dist')
}

function hbs() {
  return gulp
    .src(['src/**/*.hbs', '!src/partials/*'])
    .pipe(handlebars().partials('./src/partials/*.hbs'))
    .pipe(extReplace('.html'))
    .pipe(gulp.dest('dist'))
}

function sass() {
  var destDir = 'dist/assets/css'
  return gulp
    .src('assets/scss/style.scss')
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(autoprefixer('last 3 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(gulp.dest(destDir))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifyCss())
    .pipe(gulp.dest(destDir))
}

function copyAssets() {
  return gulp
    .src('assets/{img,js}/**/*', { base: 'assets' })
    .pipe(gulp.dest('dist/assets'))
}

function copyRootAssets() {
  return gulp.src('assets/root/*').pipe(gulp.dest('dist'))
}

const copy = gulp.parallel(copyAssets, copyRootAssets)

function serviceWorker() {
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
}

// gulp.watch('./assets/scss/**/**.scss', sass)
exports.build = gulp.series(clean, hbs, sass, copy, serviceWorker)
