// 引入 gulp
var gulp = require('gulp');

// 引入组件
var compass = require('gulp-compass');

// style path，由业务自己配置
var scssPath = './usage/demo/page';
var cssPath = './usage/demo/export';

// 编译Sass
// 只能编译不超过16个文件，谁能破，请告诉我呀
gulp.task('compass', function() {
  gulp.src(scssPath + '/*.scss')
    .pipe(compass({
        config_file: './config.rb',
        css: cssPath,
        sass: scssPath,
        style: 'compressed'
    }))
});

// watch变更
gulp.task('watch', function() {
    gulp.watch('./**/*.scss', ['compass']);
});

// 默认任务
gulp.task('default', ['compass', 'watch']);