/**
 * postinstall脚本
 * 在npm install结束后,复制style到用户配置的yo-path,然后修改组件style.scss中的样式引用
 */
require('babel-polyfill');
var copyStyleToDestFolder = require('./util').copyStyleToDestFolder,
    walkThroughComponentFiles = require('./util').walkThroughComponentFiles,
    writeTransformedFileToDestFolder = require('./util').writeTransformedFileToDestFolder,
    relocateStyleRef = require('./util').relocateStyleRef,
    Path = require('path'),
    CWD = process.cwd(),
    fs = require('fs');

var projectCwd = (function () {
    var cwd = CWD;
    while (!cwd.match(/node_modules$/) && cwd !== Path.resolve(cwd, '..')) {
        cwd = Path.resolve(cwd, '..');
    }
    cwd = Path.resolve(cwd, '..');
    
    return cwd;
})();
var pkgpath = Path.resolve(projectCwd, 'package.json');

if (fs.existsSync(pkgpath)) {
    var yoConfig = JSON.parse(fs.readFileSync(pkgpath, 'utf8')).yo || { path: 'yo' };
    var styleFolderPath = Path.resolve(projectCwd, yoConfig.path);
    copyStyleToDestFolder(styleFolderPath);
    walkThroughComponentFiles('post-install').filter(function (file) {
        return file.type === 'scss';
    }).forEach(function (file) {
        writeTransformedFileToDestFolder(relocateStyleRef(file.path, styleFolderPath, file.name), file.path, file.name);
    });
}
