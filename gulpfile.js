var gulp            = require('gulp');
var sass            = require('gulp-ruby-sass');
var del             = require('del');
var autoprefixer    = require('gulp-autoprefixer');
var cssnano         = require('gulp-cssnano');
var rename          = require('gulp-rename');
var jshint          = require('gulp-jshint');
var uglify          = require('gulp-uglify');
var concat          = require('gulp-concat');
var babel           = require('gulp-babel');


gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'html');
});


gulp.task('clean', function() {
    return del(['dist/css', 'dist/js', 'dist/**/*.html']);
});

gulp.task('styles', function() {
    return sass('./src/styles/main.scss')
        .on('error', sass.logError)
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function() {
    return gulp.src('./src/scripts/**/*.js')
        .pipe(jshint({esversion: 6}))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(babel())
        .pipe(gulp.dest('./dist/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('html', function() {
    return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist'));
});


gulp.task('watch', function(){
    gulp.watch('./src/styles/**/*.scss',    ['styles']);
    gulp.watch('./src/scripts/**/*.js',     ['scripts']);
    gulp.watch('./src/html/**/*.html',      ['html']);
});
