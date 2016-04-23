var gulp = require('gulp');
var mocha = require('gulp-mocha');
var ts = require('gulp-typescript');

gulp.task('test-tester', () => {
  return gulp.src('./test/_testTester.js')
    .pipe(mocha({reporter:'nyan'}));
});


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

gulp.task('test-dev', [/*'test-cfg', */'test-units', 'test-integration'], () => {
  gulp.watch('test/**/*.ts', ['test-ts']);
  gulp.watch('./**/*.js', ['build-tests']);
});

gulp.task('build-tests', () => {
  return gulp.src('test/**/*.ts')
    .pipe(ts(tsProject))
    .pipe(gulp.dest('test'));
});


var tsProject = ts.createProject('tsconfig.json', {
  module: 'commonjs',
  target: 'es5'
});

var ts_files = ['lib/**/*.ts'];

gulp.task('dev-ts', ['build-ts'], () => {
  gulp.watch(ts_files, ['dev-ts']);
});

gulp.task('build-ts', () => {
  return gulp.src(ts_files)
    .pipe(ts(tsProject))
    .pipe(gulp.dest('dist'));
});

// change to testing dist files
gulp.task('build', ['build-ts', 'test']);

// move built js files to dist.
// update refs

