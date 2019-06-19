const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const postcssPxToViewport = require('postcss-px-to-viewport');

module.exports = {
    entry: {
        app: './src/index.js',
        print: './src/print.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'output management'
        })
    ],
    module: {
        rules: [{
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
                'file-loader',
                {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                            quality: 65
                        },
                        // optipng.enabled: false will disable optipng
                        optipng: {
                            enabled: false,
                        },
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                        },
                        gifsicle: {
                            interlaced: false,
                        },
                        // the webp option will enable WEBP
                        webp: {
                            quality: 75
                        }
                    },
                },
            ],
        }, {
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'postcss-loader',
                options: {
                    plugins: (loader) => [
                        require('postcss-px-to-viewport')({
                            viewportWidth: 750, //根据视觉稿的宽度进行设置
                            viewportHeight: 1334,
                            unitPrecision: 5,
                            viewportUnit: 'vw',
                            selectorBlackList: [], //忽略转换的css选择器
                            minPixelValue: 1,
                            mediaQuery: false
                        }),
                    ]
                }
            }],
        }]
    }
};