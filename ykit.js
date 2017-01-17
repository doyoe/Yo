var webpack = require('webpack');

function getEntry(name, demojs) {
    if (!demojs) {
        demojs = 'demo.js';
    }
    return ['babel-polyfill', './component_dev/' + name + '/test/' + demojs];
}

exports.config = function () {
    this.setExports([
        getEntry('swipemenulist'),
        getEntry('actionsheet'),
        getEntry('alert'),
        getEntry('carousel'),
        getEntry('confirm'),
        getEntry('dialog'),
        getEntry('grouplist'),
        getEntry('list'),
        getEntry('modal'),
        getEntry('inputnumber'),
        getEntry('range'),
        getEntry('rating'),
        getEntry('suggest'),
        getEntry('switch'),
        getEntry('toast'),
        getEntry('calendar'),
        getEntry('swipemenu'),
        getEntry('picker'),
        getEntry('loading'),
        getEntry('multilist'),
        getEntry('datetimepicker'),
        getEntry('scroller', 'demo_sticky.js')
    ]);

    this.setConfig(function (config) {
        config.context = './';

        var plugin = new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('dev')
            }
        });

        config.plugins.push(plugin);

        config.output.prd.filename = '[name][ext]';

        config.module = {
            loaders: [
                {
                    test: /\.scss$/,
                    loaders: ['style', 'css', 'sass']
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel',
                    query: {
                        presets: ['es2015', 'react', 'stage-0']
                    }
                }
            ]
        };

        config.devtool = 'source-map';

        return config;
    });
};