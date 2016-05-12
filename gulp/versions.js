var fs = require('fs');
var path = require('path');
var sass = require('gulp-sass-china').compiler;
var execSync = require('child_process').execSync;

// 读取 Yo 版本号
function getVersion() {
    var config = fs.readFileSync(path.join(__dirname, '..', 'lib', 'core', 'variables.scss'), 'UTF-8').match(/version:\s*"(\d+\.\d+\.\d+\w*)"/);

    return config ? config[1] : 'Not Found';
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
    } catch (e) {
    }
    return version;
}

// Node-sass Version
function getNodeSassVersion() {
    var version = '未知';

    try {
        var str = sass.info;
        var matchNodeSass = str.match(/node-sass\s+(\S*)\s+\(/);
        var matchLibSass = str.match(/libsass\s+(\S*)\s+\(/);
        if (matchNodeSass && matchLibSass) {
            version = matchNodeSass[1] + ' ( libsass ' + matchLibSass[1] + ' )';
        }
    } catch (e) {
    }
    return version;
}

module.exports = {
    yo: getVersion(),
    sass: getSassVersion(),
    "node-sass": getNodeSassVersion()
}
