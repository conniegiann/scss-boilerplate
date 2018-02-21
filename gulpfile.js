var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

// Test
gulp.task('hello', function() {
  console.log('hello this works!');
});

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(autoprefixer({ // Adds autoprefixer
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('app/css')) // The root of the server using browser sync
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() { // Live reloading
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
  // Other watch tasks here
});
