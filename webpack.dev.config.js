var path = require("path");
var webpack = require("webpack");
var autoprefixer = require("autoprefixer");
var htmlWebpackPlugin = require("html-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
var WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin");
var publicPath = "/";
var port = 3007;
process.env.NODE_ENV = "development";
process.noDeprecation = true

module.exports = {
    entry: [
        "webpack-dev-server/client?http://localhost:"+port,
        "webpack/hot/dev-server",
        "./src/index",
    ],
    cache: true,
    devtool: "cheap-module-source-map",
    output: {
        path: path.join(__dirname, "build"),
        pathinfo: true,
        filename: "static/js/bundle.js",
        publicPath: publicPath,
        chunkFilename: "[name].[chunkhash:5].chunk.js",
    },
    devServer: {
        compress: true,
        // hot: true,
        contentBase: "./src/",
        historyApiFallback: true,
        port: port,
        publicPath: publicPath,
        noInfo: false,
    },
    resolve: {
        extensions: [".js", ".jsx"],
        modules: [path.resolve(__dirname, 'node_modules')],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: "eslint-loader",
                include: path.resolve(__dirname,"src"),
                exclude: path.resolve(__dirname, "node_modules"),
                enforce: "pre",
                options: {
                    cache: true,
                    useEslintrc: true,
                    formatter: require('eslint-friendly-formatter'),
                },
            },
            {
                exclude: [
                    /\.html$/,
                    /\.(js|jsx)(\?.*)?$/,
                    /\.less$/,
                    /\.css$/,
                    /\.json$/,
                    /\.svg$/,
                ],
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            name: "static/media/[name].[hash:8].[ext]",
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: "react-hot-loader",
                    },
                    {
                        loader: "babel-loader",
                        options: {cacheDirectory: true},
                    }
                ],
                include: path.resolve(__dirname, "src"),
                exclude: path.resolve(__dirname, "node_modules"),
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                    },
                    {
                        loader: "less-loader",
                        options: {
                            modifyVars:{"@primary-color":"#404040"},
                        },
                    },
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: "postcss-loader",
                    },
                ]
            },
            {
                test: /\.svg$/,
                use: [
                {
                    loader: "file-loader",
                    options: {
                        name: "static/media/[name].[hash:8].[ext]",
                    },
                }],
            },
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname,"public/index.html"),
            favicon: path.resolve(__dirname,"public/favicon.ico"),
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
                NODE_ENV: JSON.stringify("development"),
                SERVER_URL: JSON.stringify("http://www.example-dev.com/api/v1/")
            },
        }),
        new CaseSensitivePathsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({ url: "http://127.0.0.1:"+port }),
        new WatchMissingNodeModulesPlugin(path.resolve(__dirname, "node_modules")),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: () => {
                    return [
                        autoprefixer({
                            browsers: [
                                ">1%",
                                "last 4 versions",
                                "Firefox ESR",
                                "not ie < 9",
                            ]
                        }),
                    ];
                },
            }
        }),
    ],
};
