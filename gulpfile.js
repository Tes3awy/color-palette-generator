const { watch, series } = require('gulp');
const browserSync = require('browser-sync').create();

// Static server
function browsersyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: '.'
    }
  });
  cb();
}

// Reload
function browsersyncReload(cb) {
  browserSync.reload();
  cb();
}

// Watch
function watchTask() {
  watch('index.html', browsersyncReload);
  watch('public/css/*.css', browsersyncReload);
  watch('public/js/*.js', browsersyncReload);
}

// Default
exports.default = series(browsersyncServe, watchTask);
