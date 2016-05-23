var fs = require('fs');
var path = require('path');
var conf = JSON.parse(fs.readFileSync(path.join(__dirname, '../qdoc.config'), 'UTF-8')),
    pages = conf.pages.slice(1);

pages[0].name = 'index';

module.exports = {
    dest: 'uedoc',
    common: {
        "title": "Yo",
        "footer": "Made By Qunar MFE. © 2014 - 2016",
        "home": "HY",
        "homeUrl": "http://ued.qunar.com/mobile/",
        "navbars": [{
            "name": "QApp",
            "url": "http://ued.qunar.com/mobile/qapp/doc/"
        }, {
            "name": "Kami",
            "url": "http://ued.qunar.com/mobile/kami/doc/"
        }, {
            "name": "Yo",
            "url": "http://ued.qunar.com/mobile/yo/doc/"
        }, {
            "name": "QunarAPI",
            "url": "http://hy.qunar.com/docs/qunarapi-api.html"
        }, {
            "name": "QMB2",
            "url": "http://ued.qunar.com/mobile/qmb2/",
            "target": "_blank"
        }, {
            "name": "Statistics",
            "url": "http://ued.qunar.com/mobile/statistics/"
        }, {
            "name": "Blog",
            "url": "http://ued.qunar.com/mobile/blog/",
            "target": "_blank"
        }, {
            "name": "Hytive",
            "url": "http://hy.qunar.com/docs/index.html"
        }]
    },
    pages: pages
};
