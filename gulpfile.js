var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test-cfg', () => {
  var cfg_path = './test/_config.js';
  return gulp.src(cfg_path, { read: false })
    .pipe(mocha({ reporter: 'nyan' }));
});

gulp.task('test-units', () => {
  var units_path = ['./test/units/*.js'];
  return gulp.src(units_path, { read: false })
    .pipe(mocha());
});

gulp.task('test-integration', () => {
  var integration_path = ['./test/integration/*.js'];
  return gulp.src(integration_path, { read: false })
    .pipe(mocha());
});

gulp.task('test', ['test-cfg', 'test-units', 'test-integration']);

gulp.task('test-dev', ['test-cfg', 'test-units', 'test-integration'], () => {
  gulp.watch('./**/*.js', ['test-dev']);
});

