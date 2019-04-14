const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js',
        another: './src/another-module.js',
        pritn: './src/print.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'output management'
        }),
        new webpack.HashedModuleIdsPlugin()
    ],
    // module: {
    //     rules: [{
    //         test: /\.js$/,
    //         include: path.resolve(__dirname, 'src'),
    //         loader: 'babel-loader'
    //     }]
    // },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                // why?
                vendor: {
                    test: /lodash/,
                    name: 'vendors'
                },
                commons: {
                    name: 'commons',
                    minChunks: 2
                }
            }
        }
    }
};