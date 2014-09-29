var gulp    = require('gulp'),
  less      = require('gulp-less'),
  wrap      = require('gulp-wrap'),
  watch     = require('gulp-watch'),  
  concat    = require('gulp-concat'),
  insert    = require('gulp-insert'),
  uglify    = require('gulp-uglify'), 
  connect   = require('gulp-connect'),
  cssmin    = require('gulp-minify-css'),
  templates = require('gulp-angular-templates');

var vendors = [
  'src/bower_components/angular/angular.js',
  'src/bower_components/angular-cookies/angular-cookies.js',
  'src/bower_components/angular-bootstrap/ui-bootstrap.js',
  'src/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
];

var styles = [
  'src/less/dashboard/main.less',
  'src/bower_components/font-awesome/css/font-awesome.css'
];

var fonts = [
  'src/fonts/**.*',
  'src/bower_components/bootstrap/dist/fonts/*.{ttf,woff,eof,svg}',
  'src/bower_components/font-awesome/fonts/*.{ttf,woff,eof,svg}'
];

var paths = {
  js: ['src/js/**/*.*', 'dist/js/templates.js'],
  files: ['src/index.html'],
  images: 'src/img/**/*.*',
  templates: 'src/templates/**/*.html',
  fonts: fonts,
  styles: styles,
  vendors: vendors
};

// The name of the Angular module which will be injected into the templates.
var moduleName = 'Dashboard';

// Minify and copy all 3rd party libs to vendors.min.js 
gulp.task('copy-vendors', function() {
  return gulp.src(paths.vendors)
    .pipe(uglify())
    .pipe(concat('vendors.min.js'))
    .pipe(gulp.dest('dist/js'));
});

// Minify and copy all dashboard script files to dashboard.min.js
gulp.task('copy-scripts', function() {
  return gulp.src(paths.js)
    .pipe(insert.prepend('\'use strict\';'))
    .pipe(wrap('(function(){ \n<%= contents %>\n})();'))
    .pipe(uglify())
    .pipe(concat('dashboard.min.js'))
    .pipe(gulp.dest('dist/js'));
});

// Minify and copy all angular templates to templates.min.js
gulp.task('copy-templates', function() {
  return gulp.src(paths.templates)
    .pipe(templates({module: moduleName}))
    .pipe(uglify())
    .pipe(concat('templates.min.js'))
    .pipe(insert.prepend('\'use strict\';'))
    .pipe(gulp.dest('dist/js'));
});

// Copy all static/HTML files to output directory
gulp.task('copy-files', function(){
  return gulp.src(paths.files)
    .pipe(gulp.dest('dist'));
});

// Copy all images to output directory
gulp.task('copy-images', function(){
  return gulp.src(paths.images)
    .pipe(gulp.dest('dist/img'));
});

// Copy all fonts to output directory
gulp.task('copy-fonts', function(){
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('dist/fonts'));
});

// Compile less styles into dashboard.css
gulp.task('compile-less', function(){
  return gulp.src(paths.styles)
      .pipe(less())
      .pipe(cssmin())
      .pipe(concat('dashboard.min.css'))
      .pipe(gulp.dest('dist/css'));
});

// Copy the entire dist folder into the parent repository
gulp.task('copy-dist', ['copy-vendors', 'copy-scripts', 'copy-templates', 'copy-files', 'copy-images', 'copy-fonts', 'compile-less'], function (){
  return gulp.src('dist/**')
    .pipe(gulp.dest('../Styles'));
});

/**
 * Watch src
 */
gulp.task('watch', function () {
  gulp.watch(paths.vendors, ['copy-vendors']);
  gulp.watch(paths.js, ['copy-scripts']);
  gulp.watch(paths.templates, ['copy-templates']);
  gulp.watch(paths.files, ['copy-files']);
  gulp.watch(paths.images, ['copy-images']);
  gulp.watch(paths.fonts, ['copy-fonts']);
  gulp.watch(paths.styles, ['compile-less']);
});

gulp.task('webserver', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('livereload', function() {
  gulp.src(['dist/**/*.*'])
    .pipe(watch())
    .pipe(connect.reload());
});

gulp.task('build', ['copy-vendors', 'copy-scripts', 'copy-templates', 'copy-files', 'copy-images', 'copy-fonts', 'compile-less', 'copy-dist']);
gulp.task('default', ['build', 'webserver', 'livereload', 'watch']);
