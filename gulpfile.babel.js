import gulp from 'gulp'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import watch from 'gulp-watch'
import gutil from 'gulp-util'
import browserify from 'browserify'
import babel from 'gulp-babel'
import sass from 'gulp-sass'
import concat from 'gulp-concat'

gulp.task('transform', () => {
    gulp.src(['./src/**/*.jsx', './src/**/*.js'])
        .pipe(babel({
            presets: ["env", "react", "es2015", "stage-0"]
        }))
        .pipe(gulp.dest('./dist/transform'));
})

gulp.task('js', ['transform'], () => {
    browserify('./dist/transform/index.js')
        .bundle()
        .on('error', gutil.log)
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./dist'))
});

gulp.task('sass', () => {
    gulp.src('./src/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./dist'))
});

gulp.task('default', ['js', 'sass'], () => {
    gulp.watch(['./src/**/*.jsx', './src/**/*.js'], ['js']);
    gulp.watch('./src/**/*.sass', ['sass']);
});