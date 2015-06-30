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
var child_process = require('child_process');
var execSync = child_process.execSync;
var css = require('css');
var cssIsolate = require('css-isolate');

// style path，由业务自己配置
var scssPath = './usage/page';
var cssPath = './usage/export';
var scssBuildPath = './usage/build';
var diffBuildPath = './diff';

// 默认编译器
var defaultCompiler = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'))).compiler;

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
    gutil.log(gutil.colors.green('Completed!'));
}

function diffCss(compile1, compile2) {

    var diff1 = css.parse(cssIsolate.diff(this[compile1], this[compile2])),
        diff2 = css.parse(cssIsolate.diff(this[compile2], this[compile1]));

    diff1.stylesheet.rules.forEach(function(rule) {
        rule.declarations.forEach(function(declaration) {
            declaration.value += ' /* ' + compile1 + ' */';
        });
    });

    diff2.stylesheet.rules.forEach(function(rule) {
        rule.declarations.forEach(function(declaration) {
            declaration.value += ' /* ' + compile2 + ' */';
        });
    });

    var addRules = [];

    diff2.stylesheet.rules.forEach(function(rule2) {
        var has = false;
        diff1.stylesheet.rules.forEach(function(rule1) {
            if (rule1.selectors.join(',') == rule2.selectors.join(',')) {
                has = true;
                rule1.declarations = rule1.declarations.concat(rule2.declarations);
            }
        });
        if (!has) {
            addRules.push(rule2);
        }
    });

    diff1.stylesheet.rules = diff1.stylesheet.rules.concat(addRules);

    return css.stringify(diff1);

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
        cssFile = '/* Diff with sass, compass, node-sass */',
        argv = optimist.argv,
        file = argv.f || argv.file || 'yo.scss';

    Object.keys(compilers).forEach(function(compiler) {
        contents[compiler] = fs.readFileSync(path.join(__dirname, diffBuildPath, compiler, file.replace(/\.scss$/, '.css')), 'UTF-8');
    });

    cssFile += '\n\n/**';
    cssFile += '\n * Sass: ' + getSassVersion();
    cssFile += '\n * Node-Sass: ' + getNodeSassVersion();
    cssFile += '\n * Compass: ' + getCompassVersion();
    cssFile += '\n */';

    cssFile += '\n\n/* ==================== Diff sass and node-sass ==================== */\n\n' + (diffCss.call(contents, 'sass', 'node-sass') || '/* No Difference */');
    cssFile += '\n\n/* ==================== Diff sass and compass ==================== */\n\n' + (diffCss.call(contents, 'sass', 'compass') || '/* No Difference */');
    cssFile += '\n\n/* ==================== Diff compass and node-ass ==================== */\n\n' + (diffCss.call(contents, 'compass', 'node-sass') || '/* No Difference */');

    fs.writeFileSync(path.join(__dirname, diffBuildPath, 'diff.css'), cssFile, 'UTF-8');
});


// 默认任务
gulp.task('default', ['version', 'compile', 'watch']);