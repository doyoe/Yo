require('babel-polyfill');
var fs = require('fs');
var copydir = require('copy-dir');
var Path = require('path');
var CWD = process.cwd();
var componentDestRootPath = Path.resolve(__dirname, '..', 'component');
var mainTemplate = fs.readFileSync(Path.resolve(__dirname, 'entrance_tmpl'), 'utf8');
var styleSrcPath = Path.resolve(__dirname, '..', 'style');
var normalize = require('normalize-path');
var ignore = ['common', 'lazyimage', 'sticky'];

function getPathInDestFolder(filepath) {
    return filepath.replace(/component_dev/, 'component');
}

function walkThroughComponentFiles(mode) {
    var componentSrcRootPath = Path.resolve(CWD, mode !== 'post-install' ? 'component_dev' : 'component');
    var folders = fs.readdirSync(componentSrcRootPath);

    return folders.reduce(function (acc, folder) {
        var componentSrcFolderPath = ignore.indexOf(folder) === -1 ?
            Path.resolve(componentSrcRootPath, folder, 'src') :
            Path.resolve(componentSrcRootPath, folder);

        var componentFiles = fs.readdirSync(componentSrcFolderPath);
        if (componentFiles.indexOf('style.scss') === -1 && ignore.indexOf(folder) === -1) {
            componentFiles.push('style.scss');
        }

        return acc.concat(componentFiles.map(function (filename) {
            return {
                path: Path.resolve(componentSrcFolderPath, filename),
                name: folder,
                type: /\.js$/.test(filename) ? 'js' : 'scss'
            };
        }));
    }, []);
}

function writeTransformedFileToDestFolder(code, filepath, componentName) {
    if (!fs.existsSync(componentDestRootPath)) {
        fs.mkdirSync(componentDestRootPath);
    }
    var destComponentFolder = getPathInDestFolder(Path.resolve(componentDestRootPath, componentName));
    if (!fs.existsSync(destComponentFolder)) {
        fs.mkdirSync(destComponentFolder);
    }
    var destComponentSrcFolder = getPathInDestFolder(Path.resolve(destComponentFolder, 'src'));
    if (!fs.existsSync(destComponentSrcFolder) && ignore.indexOf(componentName) === -1) {
        fs.mkdirSync(destComponentSrcFolder);
    }
    fs.writeFileSync(getPathInDestFolder(filepath), code, 'utf8');
    if (ignore.indexOf(componentName) === -1) {
        createMain(destComponentFolder);
    }
}

var rimportstyle = /import\s+(['"])[^'"]+\.scss\1\s*;?/g;
var rscssimport = /@import\s+(['"])[^'"]+(\.scss)?\1\s*;?/g;

function replaceStyleRefRootPath(code, path, styleFolderPath, componentName) {
    var pathRelativeToStyleFolder = normalize(Path.relative(Path.resolve(styleSrcPath, 'src', 'style.scss'), styleFolderPath));
    var componentRef = "@import \"" + pathRelativeToStyleFolder + "\/component\/" + componentName + ".scss\";";
    var scssImports = code.match(rscssimport) || [];
    var rroot = /(\.\.\/){3}style\/usage/;
    var rcharset = /@charset\s+(['"])[^'"]+\1;?\n?/g;
    var yoRefs = (scssImports ? scssImports.filter(function (imp) {
            return rroot.test(imp);
        }) : []).concat(componentRef);
    var renderedScssImports = yoRefs.map(function (imp) {
        return {
            src: imp,
            rendered: imp.replace(rroot, pathRelativeToStyleFolder)
        };
    });

    code = yoRefs.reduce(function (acc, ref) {
        return acc.replace(ref, renderedScssImports.find(function (rimp) {
            return rimp.src === ref
        }).rendered);
    }, code).replace(rcharset, '');

    return "@charset \"utf-8\";\n" + code;
}

function relocateStyleRef(path, styleFolderPath, componentName) {
    var scssCode = fs.readFileSync(path, 'utf8');
    return replaceStyleRefRootPath(scssCode, path, styleFolderPath, componentName);
}

function deleteStyleRef(filepath) {
    var code = fs.readFileSync(filepath, 'utf8');
    return code.replace(rimportstyle, '');
}

function createMain(destFolderPath) {
    fs.writeFileSync(Path.resolve(destFolderPath, 'index.js'), mainTemplate, 'utf8');
}

function copyStyleToDestFolder(styleFolderPath) {
    if (!fs.existsSync(styleFolderPath)) {
        copydir.sync(Path.resolve(styleSrcPath, 'usage'), styleFolderPath);
        rewriteUsageRefs(styleFolderPath);
        console.log('yo/style已经被拷贝到' + styleFolderPath);
    } else {
        tryUpdateUsageFolder(styleFolderPath);
        rewriteUsageRefs(styleFolderPath);
    }
}

function tryUpdateUsageFolder(styleFolderPath) {
    var usageFolder = Path.resolve(styleSrcPath, 'usage');
    fs.readdirSync(usageFolder).forEach(function (folder) {
        if(!fs.existsSync(Path.resolve(styleFolderPath, folder))) {
            fs.mkdirSync(Path.resolve(styleFolderPath, folder));
        }
        fs.readdirSync(Path.resolve(usageFolder, folder)).forEach(function (scss) {
            var destPath = Path.resolve(styleFolderPath, folder, scss);
            if (!fs.existsSync(destPath)) {
                fs.writeFileSync(destPath, fs.readFileSync(Path.resolve(usageFolder, folder, scss), 'utf8'));
                console.log('yo:新增文件' + scss + '已经被拷贝到' + destPath + '，请调用git add将它加入到版本控制中。');
            }
        });
    });
}

function rewriteUsageRefs(searchPath) {
    var packageName = require('../package.json').name;
    var libImport = /@import\s+(['"])\.\.\/\.\.\/lib/g;
    if (fs.existsSync(searchPath)) {
        fs.readdirSync(searchPath).forEach(function(item) {
            const currentPath = Path.join(searchPath, item);
            if (fs.lstatSync(currentPath).isDirectory()) { // recurse
                rewriteUsageRefs(currentPath);
            } else { // delete item
                var scssCode = fs.readFileSync(currentPath, 'utf8');
                scssCode = scssCode.replace(libImport, '@import $1~' + packageName + '/style/lib');
                fs.writeFileSync(currentPath, scssCode);
                console.log('write', currentPath);
            }
        });
    }
};

function rewriteLibRefs(styleFolderPath) {
    var libFolderPath = Path.resolve(CWD, 'style', 'lib');
    var componentFolderPath = Path.resolve(libFolderPath, 'component');
    var libComponentScssList = fs.readdirSync(Path.resolve(libFolderPath, 'component'));
    libComponentScssList.forEach(function (scssFile) {
        var scssPath = Path.resolve(componentFolderPath, scssFile);
        var scssCode = fs.readFileSync(scssPath, 'utf8');
        var usageImport = /@import\s+(['"])\.\.\/\.\.\/usage/g;
        var relativeStylePath = Path.relative(componentFolderPath, styleFolderPath);
        scssCode = scssCode.replace(usageImport, '@import \"' + relativeStylePath);
        fs.writeFileSync(scssPath, scssCode);
    });
}

module.exports = {
    walkThroughComponentFiles: walkThroughComponentFiles,
    deleteStyleRef: deleteStyleRef,
    writeTransformedFileToDestFolder: writeTransformedFileToDestFolder,
    relocateStyleRef: relocateStyleRef,
    copyStyleToDestFolder: copyStyleToDestFolder
};
