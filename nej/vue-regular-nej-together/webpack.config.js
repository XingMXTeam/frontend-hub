const path = require('path');

module.exports = {
    entry: './main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    // module: {
    //     rules: [
    //         {
    //             test: /\.js$/,
    //             exclude: /(node_modules|bower_components)/,
    //             use: {
    //                 loader: 'babel-loader',
    //                 options: {
    //                     presets: ['@babel/preset-es2015'],
    //                     plugins: ["transform-remove-strict-mode", 'babel-plugin-transform-nej-module']
    //                 }
    //             }
    //         },
    //         {
    //             test: /\.css$/,
    //             exclude: /(node_modules|bower_components)/,
    //             use: ['style-loader', 'css-loader']
    //         },
    //         {
    //             test: /\.(html)$/,
    //             use: {
    //                 loader: 'html-loader',
    //                 options: {
    //                     attrs: [':data-src']
    //                 }
    //             }
    //         }
    //     ]
    // },
    // resolve: {
    //     alias: {
    //         'pro': path.resolve(__dirname, 'src/javascript'),
    //         'pool': path.resolve(__dirname, 'lib'),
    //         'base': path.resolve(__dirname, 'lib/nej/src/base'),
    //         'platform': path.resolve(__dirname, 'lib/nej/src/base/platform')
    //     }
    // }
};