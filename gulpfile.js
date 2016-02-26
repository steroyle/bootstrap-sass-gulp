var gulp    = require('gulp');
var sass    = require('gulp-sass');
var concat  = require('gulp-concat');
var uglify  = require("gulp-uglify");
var minifycss = require("gulp-minify-css");

// folders
var source = 'src/';
var dest = 'dist/';

// Bootstrap source
var bootstrapPath = './bower_components/bootstrap-sass/';

//sass options

var sassOptions = {
  outputStyle: 'nested',
  precison: 3,
  errLogToConsole: true,
  includePaths: [bootstrapPath + 'assets/stylesheets']
};

gulp.task('sass', function () {
  return gulp.src(source + 'css/**/*.scss')
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(minifycss())
    .pipe(gulp.dest(dest + 'css/'));
});

//scripts
gulp.task('scripts', function() {
  return gulp.src([bootstrapPath + 'assets/javascripts/bootstrap.min.js', source + 'js/**/*.js'])
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dest + 'js/'));
});

// copy bootstrap fonts to dest
gulp.task('fonts', function () {
  return gulp
    .src(bootstrapPath + 'assets/fonts/**/*')
    .pipe(gulp.dest(dest + 'fonts/'));
});

// default task
gulp.task('default', ['sass', 'scripts', 'fonts'], function () {
   gulp.watch([source + 'css/**/*.scss'], ['sass']);
   gulp.watch([source + 'js/**/*.js'], ['scripts']);
   gulp.watch([source + 'fonts/**/*'], ['fonts']);
});
