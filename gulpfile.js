var gulp = require('gulp');
var rename = require('gulp-rename');
var cssnext = require('gulp-cssnext');

gulp.task('styles', function() {
  gulp
    .src('./src/styles.css')
    .pipe(cssnext({
      compress: true,
      features: {
        autoprefixer: {
          
        }
      }
    }))
    .pipe(rename('hawk-carousel.min.css'))
    .pipe(gulp.dest('./dist/'));
});

gulp.watch('./src/styles.css', ['styles']);

gulp.task('default', ['styles']);
