function getEntry(name, demojs) {
    if (!demojs) {
        demojs = 'demo.js';
    }
    return ['babel-polyfill', './component_dev/' + name + '/demo/' + demojs];
}

exports.config = function (ykitPlugin) {
    return {
        exports: [
            getEntry('actionsheet'),
            getEntry('alert'),
            getEntry('calendar'),
            getEntry('carousel'),
            getEntry('confirm'),
            getEntry('datetimepicker'),
            getEntry('dialog'),
            getEntry('grouplist'),
            getEntry('inputnumber'),
            getEntry('list'),
            getEntry('loading'),
            getEntry('modal'),
            getEntry('multilist'),
            getEntry('picker'),
            // getEntry('popup'),
            getEntry('popupdatetimepicker'),
            getEntry('popuppicker'),
            getEntry('range'),
            getEntry('rating'),
            getEntry('scroller'),
            getEntry('scroller', 'demo_simple.js'),
            getEntry('scroller', 'demo_nest.js'),
            getEntry('scroller', 'demo_structure_1.js'),
            getEntry('scroller', 'demo_structure_2.js'),
            getEntry('scroller', 'demo_structure_3.js'),
            getEntry('scroller', 'demo_with_input.js'),
            getEntry('scroller', 'refresh.js'),
            getEntry('scroller', 'demo_sticky.js'),
            getEntry('suggest'),
            // getEntry('swipemenu'),
            getEntry('swipemenulist'),
            getEntry('switch'),
            getEntry('toast')
        ],
        modifyWebpackConfig: function (config) {
            config.context = './';
            var plugin = new this.webpack.DefinePlugin({
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
                        loader: ykitPlugin.ExtractTextPlugin.extract(['css', 'sass'])
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

            // ykit 的一个配置，用来实现 .scss -> .css
            // config.entryExtNames.css.push('.scss')

            return config;
        }
    }
};