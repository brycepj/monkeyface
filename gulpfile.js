var gulp = require('gulp');
var mocha = require('gulp-mocha');
var ts = require('gulp-typescript');

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

gulp.task('log-perf', () => {
  // run all scripts, diff results against previous, log most recent, perhaps log stats.

});

gulp.task('test', ['test-cfg', 'test-units', 'test-integration']);

gulp.task('test-dev', ['test-cfg', 'test-units', 'test-integration'], () => {
  gulp.watch('./**/*.js', ['test-dev']);
});

var tsProject = ts.createProject('tsconfig.json', {});
var ts_files = ['lib/**/*.ts'];

gulp.task('dev-ts', ['build-ts'], () => {
  gulp.watch(ts_files, ['test-dev']);
});

gulp.task('build-ts', () => {
  return gulp.src(ts_files)
    .pipe(ts(tsProject))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['build-ts','test']);

// move built js files to dist.
// update refs

