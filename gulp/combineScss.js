var fs = require('fs');
var path = require('path');
var gutil = require('gulp-util');
var sass = require('gulp-sass-china').compiler;

// 扩展名
var extNames = ['.sass', '.scss'];
// 行号显示位数
var digits = 6;

// fix 文件路径
function fixFilePath(filePath) {

    var extName = path.extname(filePath),
        baseName = path.basename(filePath),
        dirName = path.dirname(filePath),
        privatePath;

    if (extName && fs.existsSync(filePath)) {
        return filePath;
    }
    if (!extName) {
        for (var i = 0, len = extNames.length; i < len; i++) {
            var eName = extNames[i];
            if (fs.existsSync(filePath + eName)) {
                return filePath + eName;
            }
            privatePath = path.join(dirName, '_' + baseName + eName);
            if (fs.existsSync(privatePath)) {
                return privatePath;
            }
        }
    } else {
        privatePath = path.join(dirName, '_' + baseName);
        if (fs.existsSync(privatePath)) {
            return privatePath;
        }
    }
    throw new Error('找不到import文件: ' + filePath);
}

// 修正行号
function fixLineNum(lineNum) {
    var blankNum, i, ref;
    blankNum = digits - (lineNum + '').length;
    for (i = 1, ref = blankNum; 1 <= ref ; ++i) {
        lineNum = ' ' + lineNum;
    }
    return lineNum;
}

// 显示错误上下问
function displayErrorContext(txt, lineNum) {
    var lines, start;
    start = lineNum - 5;
    lines = txt.split('\n').splice(start, 10);
    lines = lines.map(function(line, index) {
        var content, ln;
        ln = start + index + 1;
        content = (fixLineNum(ln)) + ":" + (ln === lineNum ? '->' : '  ') + " " + line;
        return content;
    });

    return lines.join('\n');
};

// 修复 window 上 path 的 seq
function fixPathSeq(path) {
    if(process.platform === "win32"){
        return path.replace(/\\/g, '/');
    }else {
        return path
    }
}

function getWholeScssFile(filePath, dir, imports) {
    var data;
    imports = imports || {};

    if(!imports[filePath]) {
        imports[filePath] = true;
        data = '\n' + fs.readFileSync(filePath);

        // 删除注释
        data = data.replace(/\/\*(.|\s)*?\*\//gm, '').replace(/\n\s*\/\/.*(?=[\n\r])/g, '');
        // 删除多余空行
        data = data.replace(/\n+/g, '\n');
        // 分析 import
        data = data.replace(/@import(.*);/g, function($1, $2){
            var ret = '';
            // 匹配 @import url("xxxx");
            content = $2.replace(/url\(.*[\'\"]([^\'^\"]+)[\'\"].*\)/g, function($3, $4) {
                if($4.indexOf('://') > -1){
                    ret += "@import url(\"" + $4 + "\");\n";
                }else {
                    var importPath = fixFilePath(path.join( path.dirname(filePath), $4));
                    // 如果是 sass 和 scss 则先编译，再将内容拼接
                    if(extNames.indexOf(path.extname(importPath)) > -1) {
                        try {
                            txt = getWholeScssFile(importPath, dir);
                            ret += sass.renderSync({
                                    data: txt,
                                    includePaths: [dir],
                                    outputStyle: 'expanded'
                                }).css.toString() + '\n';
                        }catch(err) {
                            throw new Error('文件 ' + filePath + ' 编译错误: at line ' + err.line + ' column ' + err.column + ': ' + err.message + '\n' + (displayErrorContext(txt, err.line)) );
                        }
                    }else {
                        // 其他 例如 .css 转换相对路径后，由 node-sass 解析
                        var relativePath = fixPathSeq(path.relative(dir, importPath));
                        ret += '@import url("' + relativePath + '");\n';
                    }
                }
                return '';
            });

            // 匹配 @import "xxxx";
            content.replace(/[\'\"]([^\'^\"]+)[\'\"]/g, function($5, $6) {
                if($6.indexOf('://') > -1) {
                    // http:// 直接忽略，用 node-sass 解析
                    ret += "@import \"" + $6 + "\";\n";
                }else {
                    importPath = fixFilePath(path.join(path.dirname(filePath), $6));

                    // 如果是 sass 和 scss 直接将内容拼接
                    if(extNames.indexOf(path.extname(importPath)) > -1){
                        ret += getWholeScssFile(importPath, dir, imports) + '\n';
                    }else {
                        // 其他 例如 .css 转换相对路径后，由 node-sass 解析
                        var relativePath = fixPathSeq( path.relative(dir, importPath) );
                        ret += "@import \"" + relativePath + "\";\n";
                    }
                }
                return ret;
            });
            return ret;
        });
        return data;
    }else {
        return '';
    }
}

// 合并Scss文件
function combineScss(file, enc, cb) {
    file.contents = new Buffer(getWholeScssFile(file.path, path.join(__dirname, '..')));
    cb(null, file);
}

module.exports = combineScss;
