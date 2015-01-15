// 引入 gulp
var gulp = require('gulp'); 

// 引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// style path
var scssPath = './usage/demo/page/*.scss';
var cssPath = './usage/demo/export/';

// 编译Sass
gulp.task('sass', function() {
    gulp.src(scssPath)
        .pipe(sass({ style: 'expanded'}))
        .pipe(gulp.dest(cssPath));
});

// 默认任务
gulp.task('default', function(){
    gulp.run('sass');
    gulp.watch('./**/*.scss', ['sass']);
});