const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const srcPath = path.join(__dirname, './src');
const distPath = path.join(__dirname, './dist');

module.exports = function (env) {
    const nodeEnv = env && env.prod ? 'production' : 'development';
    const isProd = nodeEnv === 'production';
    let plugins = [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(nodeEnv || 'development')
        }),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ];
    let module = {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [
                    /node_modules/
                ],
                use: [
                    'react-hot-loader',
                    'babel-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    };

    if (isProd) {
        plugins.push(
            new ExtractTextPlugin({
                filename: 'style.css',
                allChunks: true
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false,
                options: {
                    postcss: [
                        autoprefixer({
                            browsers: [
                                'last 3 version',
                                'ie >= 9'
                            ]
                        })
                    ],
                    context: srcPath
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    screw_ie8: true,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true
                },
                output: {
                    comments: false
                }
            })
        );
        module.rules.push({
            test: /\.s?css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader', 'sass-loader']
            })
        }, {
            test: /\.(woff(2)?|eot|ttf|otf)(\?[a-z0-9=.]+)?$/,
            use: 'file-loader'
        });

    } else {
        plugins.push(
            new webpack.HotModuleReplacementPlugin()
        );

        module.rules.push({
            test: /\.s?css$/,
            exclude: /node_modules/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                query: { sourceMap: true }
            }, {
                loader: 'postcss-loader'
            }, {
                loader: 'sass-loader',
                query: { sourceMap: true, sourceComments: true }
            }]
        }, {
            test: /\.(woff(2)?|eot|ttf|otf)(\?[a-z0-9=.]+)?$/,
            use: 'url-loader'
        });
    }

    return {
        context: srcPath,
        entry: './index.jsx',
        output: {
            filename: 'bundle.[hash].js',
            path: distPath
        },
        devtool: isProd ? 'source-map' : 'eval',
        plugins: plugins,
        module: module,
        resolve: {
            extensions: ['.js', '.jsx'],
            modules: [
                path.resolve(__dirname, 'node_modules'),
                srcPath
            ]
        },
        performance: isProd && {
            maxAssetSize: 100,
            maxEntrypointSize: 300,
            hints: 'warning'
        },
        devServer: {
            host: 'localhost',
            port: 3000,
            hot: true,
            inline: true,
            contentBase: path.resolve(__dirname, 'dist'),
            publicPath: '/'
        }
    };
};
