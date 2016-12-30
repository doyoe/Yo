var gutil = require('gulp-util');
var notifier = require('node-notifier');
var path = require('path');

// Error Handler
function errorHandler(e) {
    notifier.notify({
        title: 'Sass Error',
        message: e.fileName,
        icon: path.join(__dirname, '../shortcut.png'),
        sound: true
    });
    gutil.log(gutil.colors.red(e.message));
    this.emit('end');
}

// End Handler
function endHandler() {
    gutil.log(gutil.colors.green('Completed!'));
}

module.exports = {
    error: errorHandler,
    end: endHandler
};
