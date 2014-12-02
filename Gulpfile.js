// 引入 gulp
var gulp = require('gulp'); 

// 引入组件
var sass = require('gulp-ruby-sass');
var minifycss = require( 'gulp-minify-css' );
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var clean = require('gulp-clean');
var path = require('path');

var cssSrc = './src/yo/usage/demo/page/*.scss',
    cssDst = './src/yo/usage/demo/export/';
    
// 编译Sass
gulp.task('sass', function () {
    gulp.src(cssSrc)
        .pipe(sass({ style: 'expanded'}))
        .pipe(gulp.dest(cssDst))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(cssDst));
});

// 清空dist目录下地styles和scripts
gulp.task('clean', function() {
    gulp.src([cssDst], { read: false })
        .pipe(clean());
});

// 默认任务 清空样式、js并重建 运行语句 gulp
gulp.task('default', ['clean'], function(){
    gulp.start('sass');
});

// 监听任务 运行语句 gulp watch
gulp.task('watch',function(){
    gulp.watch('./src/yo/**/*.scss', ['sass']);
});
