var webpack = require('webpack');

function getEntry(name, demojs) {
    if (!demojs) {
        demojs = 'demo.js'
    }
    return ['babel-polyfill', './component_dev/' + name + '/test/' + demojs];
}

exports.config = function (options, cwd) {
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

    this.commands.push({
        name: 'project_cmd',
        module: {
            usage: '项目自定义的命令',
            run: function () {
            }
        }
    });

    this.setConfig((config) => {
        config.context = './';

        var plugin = new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        });

        config.plugins.push(plugin);

        config.output.prd.filename = '[name][ext]';

        config.module = {
            preLoaders: [],
            loaders: config.module.loaders.map((loader) => {
                if (loader.test.test('.scss')) {
                    return {
                        test: /\.scss$/,
                        loaders: ['style', 'css', require.resolve('@qnpm/ykit-config-qunar/loaders/sass.js')]
                    }
                }
                if (loader.test.test('.js')) {
                    return {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel',
                        query: {
                            presets: ['es2015', 'react', 'stage-0']
                        }
                    }
                }
                return loader;
            })
        };

        config.devtool = 'source-map';

        return config;
    });
};