var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var notify = require("gulp-notify");
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');

//合并、压缩、重命名css、js
gulp.task('minify', function() {
  return gulp.src('src/*.html')
    .pipe(useref())
    //压缩css
    .pipe(gulpIf('*.css', cleanCSS({compatibility: 'ie8'})))
    //压缩js
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dest'))
    .pipe(notify({ message: 'Minify task ok' }));
});

//js检测
gulp.task('lint', function() {
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(notify({ message: 'lint task ok' }));
});


// 默认任务
gulp.task('default', function(){
  gulp.run('minify', 'lint');
 
  // 监听html文件变化
  gulp.watch('src/*.html', function(){
    gulp.run('minify');
  });
 
  // Watch .css files
  gulp.watch('src/css/*.css', ['minify']);
 
  // Watch .js files
  gulp.watch('src/js/*.js', ['minify']);
});
