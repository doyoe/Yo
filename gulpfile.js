// 引入 gulp
var gulp = require('gulp');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');

// 引入组件
var compass = require('gulp-compass');
var sass = require('gulp-ruby-sass');
var nodeSass = require('gulp-sass');
var importOnce = require('node-sass-import-once');
var stripCssComments = require('gulp-strip-css-comments');
var through = require('through2');

// 引入其他
var path = require('path');
var fs = require('fs');
var optimist = require('optimist');
var notifier = require('node-notifier');
var uglifycss = require('uglifycss');
var child_process = require('child_process');
var execSync = child_process.execSync;
var css = require('css');
var cssIsolate = require('css-isolate');

// style path，由业务自己配置
var scssPath = './usage/page';
var cssPath = './usage/export';
var scssBuildPath = './usage/build';
var cssBuildPath = './build';
var diffBuildPath = './diff';

// 默认编译器
var defaultCompiler = 'compass';

// 读取 Yo 版本号
function getVersion() {
    var config = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json')));
    return config.version;
}

// Sass Version
function getSassVersion() {
    var version = '未知';
    try {
        var str = execSync('sass -v').toString();
        var match = str.match(/Sass\s+(\S*)\s+\(/);
        if (match) {
            version = match[1];
        }
    } catch(e) {}
    return version;
}

// Compass Version
function getCompassVersion() {
    var version = '未知';
    try {
        var str = execSync('compass -v').toString();
        var match = str.match(/Compass\s+(\S*)\s+\(/);
        if (match) {
            version = match[1];
        }
    } catch(e) {}
    return version;
}

// Node-sass Version
function getNodeSassVersion() {
    var version = '未知';

    try {
        // 全局的 node-sass 版本
        //var str = execSync('node-sass -v').toString();
        // gulp-sass 里包含的 node-sass版本
        var str = nodeSass.compiler.info;
        var matchNodeSass = str.match(/node-sass\s+(\S*)\s+\(/);
        var matchLibSass = str.match(/libsass\s+(\S*)\s+\(/);
        if (matchNodeSass && matchLibSass) {
            version = matchNodeSass[1] + ' ( libsass ' + matchLibSass[1] + ' )';
        }
    } catch(e) {}
    return version;
}

// Beautify Css

function beautifyCss(file, enc, cb) {
    file.contents = new Buffer(css.stringify(css.parse(file.contents.toString().replace(/\n+/g, '\n'))));
    cb(null, file);
}

// Error Handler
function errorHandler(e) {
    notifier.notify({
        title: 'Sass Error',
        message: e.fileName,
        icon: path.join(__dirname, 'sass.jpg'),
        sound: true
    });
    gutil.log(gutil.colors.red(e.message));
}

// End Handler
function endHandler() {
    var argv = optimist.argv,
        min = argv.m || argv.min;
    // 添加版本号
    if (argv._ == 'build') {
        var version = getVersion();
        var list = fs.readdirSync(path.join(__dirname, scssBuildPath));
        list.forEach(function(name) {
            var cssFile = path.join(__dirname, cssBuildPath, name.replace(/.scss$/, '.css')),
                cssVersionFile = path.join(__dirname, cssBuildPath, name.replace(/.scss$/, '-' + version + '.css'));
            fs.writeFileSync(cssVersionFile, fs.readFileSync(cssFile, 'UTF-8'), 'UTF-8');
            gutil.log(gutil.colors.blue('构建文件: ' + path.relative(__dirname, cssFile)));
            gutil.log(gutil.colors.blue('构建文件: ' + path.relative(__dirname, cssVersionFile)));
            if (min) {
                fs.writeFileSync(cssFile.replace(/.css$/, '.min.css'), uglifycss.processFiles([cssFile]), 'UTF-8');
                gutil.log(gutil.colors.blue('构建文件: ' + path.relative(__dirname, cssFile.replace(/.css$/, '.min.css'))));
                fs.writeFileSync(cssVersionFile.replace(/.css$/, '.min.css'), uglifycss.processFiles([cssVersionFile]), 'UTF-8');
                gutil.log(gutil.colors.blue('构建文件: ' + path.relative(__dirname, cssVersionFile.replace(/.css$/, '.min.css'))));
            }
        });
    }
    gutil.log(gutil.colors.green('Completed!'));
}

// 构建 Compass Gulp
function buildCompassGulp(scssPath, cssPath) {
    return gulp.src(scssPath + '/*.scss')
        .pipe(plumber({
            errorHandler: errorHandler
        }))
        .pipe(compass({
            config_file: './config.rb',
            css: cssPath,
            sass: scssPath,
            // nested, expanded, compact, compressed
            style: 'expanded'
        }))
        .pipe(gulp.dest(cssPath))
        .on('end', endHandler);
}

// 构建 Node-Sass Gulp
function buildNodeSassGulp(scssPath, cssPath) {
    return gulp.src(scssPath + '/*.scss')
        .pipe(plumber({
            errorHandler: errorHandler
        }))
        .pipe(nodeSass({
            importer: importOnce,
            outputStyle: 'expanded'
        }))
        .pipe(gulp.dest(cssPath))
        .on('end', endHandler);
}

// 构建 Sass Gulp
function buildSassGulp(scssPath, cssPath) {
    return sass(scssPath, {
        style: 'expanded'
    })
        .pipe(plumber({
            errorHandler: errorHandler
        }))
        .pipe(gulp.dest(cssPath))
        .on('end', endHandler);
}

var compilers = {
    sass: buildSassGulp,
    compass: buildCompassGulp,
    'node-sass': buildNodeSassGulp
};

// 编译 Sass
gulp.task('compile', function () {
    var argv = optimist.argv,
        compiler = argv.c || argv.compiler || defaultCompiler;
    if (compilers[compiler]) {
        gutil.log(gutil.colors.yellow('使用编译器 ' + compiler + ' 编译...'));
        return compilers[compiler](scssPath, cssPath);
    } else {
        gutil.log(gutil.colors.red('找不到编译器 ' + compiler));
    }
});

// 构建 yo.css
gulp.task('build', function () {
    var argv = optimist.argv,
        compiler = argv.c || argv.compiler || defaultCompiler;
    if (compilers[compiler]) {
        gutil.log(gutil.colors.yellow('使用编译器 ' + compiler + ' 编译...'));
        return compilers[compiler](scssBuildPath, cssBuildPath);
    } else {
        gutil.log(gutil.colors.red('找不到编译器 ' + compiler));
    }
});

// watch变更
gulp.task('watch', function () {
    gulp.watch('./**/*.scss', ['compile']);
});

// 获取 Version
gulp.task('version', function() {
    gutil.log(gutil.colors.green('Yo: ' + getVersion()));
    gutil.log(gutil.colors.green('Sass: ' + getSassVersion()));
    gutil.log(gutil.colors.green('Node-sass: ' + getNodeSassVersion()));
    gutil.log(gutil.colors.green('Compass: ' + getCompassVersion()));
});

// diff

var diffBuildTasks = [];

Object.keys(compilers).forEach(function(compiler) {
    diffBuildTasks.push('compile:' + compiler);
    gulp.task('compile:' + compiler, function () {
        return compilers[compiler](scssBuildPath, path.join(diffBuildPath, compiler));
    });
});

gulp.task('pre-diff', diffBuildTasks, function() {
    return gulp.src(diffBuildPath + '/**/*.css')
        .pipe(stripCssComments())
        .pipe(through.obj(beautifyCss))
        .pipe(gulp.dest(diffBuildPath));
});

gulp.task('diff', ['pre-diff'], function() {
    var contents = {},
        cssFile = '/* Diff with sass, compass, node-sass */';

    Object.keys(compilers).forEach(function(compiler) {
        contents[compiler] = fs.readFileSync(path.join(__dirname, diffBuildPath, compiler, '/yo.css'), 'UTF-8');
    });

    Object.keys(compilers).forEach(function(compiler1) {
        Object.keys(compilers).forEach(function(compiler2) {
            if (compiler1 != compiler2) {
                cssFile += '\n\n/* ' + compiler1 + ' --> ' + compiler2 + ' */\n\n';
                cssFile += cssIsolate.diff(contents[compiler1], contents[compiler2]);
            }
        });
    });

    fs.writeFileSync(path.join(__dirname, diffBuildPath, 'diff.css'), cssFile, 'UTF-8');
});


// 默认任务
gulp.task('default', ['version', 'compile', 'watch']);