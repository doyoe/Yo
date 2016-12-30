/**
 * 构建脚本
 * 将component_dev的源码转化为component中的es5代码,并去掉js中scss的引用
 */
'use strict';
require('babel-polyfill');
var babel = require('babel-core');
var walkThroughComponentFiles = require('./util').walkThroughComponentFiles,
    deleteStyleRef = require('./util').deleteStyleRef,
    rmdirRecursive = require('rmdir-recursive'),
    writeTransformedFileToDestFolder = require('./util').writeTransformedFileToDestFolder,
    createComponentScss = require('./util').createComponentScss,
    Path = require('path'),
    fs = require('fs');

var componentDestRootPath = Path.resolve(__dirname, '..', 'component');
rmdirRecursive.sync(componentDestRootPath);
walkThroughComponentFiles().forEach(function (file, i) {
    console.log('processing:' + file.path);
    var renderedCode = file.type === 'js' ? deleteStyleRef(file.path) : fs.existsSync(file.path) ? fs.readFileSync(file.path) : '';
    var transformedCode = file.type === 'js' ? babel.transform(renderedCode, {
        presets: ['es2015', 'react', 'stage-0'],
        env: { NODE_ENV: 'production' }
    }).code : renderedCode;
    writeTransformedFileToDestFolder(transformedCode, file.path, file.name);
});

