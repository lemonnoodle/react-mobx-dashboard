var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require("html-webpack-plugin");
var ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

var vendors = [
    'antd',
    'isomorphic-fetch',
    'react',
    'react-dom',
    'react-router',
    'vis',
    'react-graph-vis',
    'lodash',
    'echarts',
];

module.exports = {
    entry: {
        vendor: vendors
    },
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: '/',
        filename: 'static/js/[name].js',
        library: '[name]_library'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    plugins: ['lodash'],
                    presets: [['env', { 'modules': false, 'targets': { 'node': 4 } }]]
            }
    }
      }]
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "manifest.json"),
            name: '[name]_library',
            context: __dirname,
        }),
        new LodashModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname,"public/index.html"),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new ParallelUglifyPlugin({
            cacheDir: '.uglifyjscache/',
            uglifyJS:{
                output: {
                    comments: false
                },
                compress: {
                    warnings: false
                }
            }
        }),
    ]
};
