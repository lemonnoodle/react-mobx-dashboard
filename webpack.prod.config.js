var path = require("path");
var webpack = require("webpack");
var autoprefixer = require("autoprefixer");
var htmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
var CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
var WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin");
var publicPath = "/";
process.env.NODE_ENV = "production";
process.noDeprecation = true

module.exports = {
    entry: {
        index: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname,"build"),
        filename: "static/js/[hash].bundle.js",
        publicPath: publicPath,
        chunkFilename: "[name].[chunkhash:5].chunk.js",
        pathinfo: true,
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: true,
                            }
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
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 1,
                                minimize: true,
                            },
                        },
                        {
                            loader: "postcss-loader",
                        },
                    ]
                })
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
        new ExtractTextPlugin({
            filename:  (getPath) => {
                return getPath("static/css/[hash].bundle.css");
            },
            disable: false,
            allChunks: true,
        }),
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
                NODE_ENV: JSON.stringify("production"),
                SERVER_URL: JSON.stringify("http://www.example.com/api/v1/")
            },
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
        new CaseSensitivePathsPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new WatchMissingNodeModulesPlugin(path.resolve(__dirname, "node_modules")),
        // new webpack.DllReferencePlugin({
        //     context: __dirname,
        //     manifest: require("./manifest.json"),
        // }),
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
}
