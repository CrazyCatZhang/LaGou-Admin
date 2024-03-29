const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'js/app': './src/app.js'
    },

    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js',
        clean: true
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './public/*.ico',
                    to: path.join(__dirname, './dist/favicon.ico'),
                },
                {
                    from: './public/libs',
                    to: path.join(__dirname, './dist/libs'),
                }
            ]
        })
    ],
    devServer: {
        static: './dist',
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
            },
        }
    },
    module: {
        rules: [
            {
                test: /\.art$/,
                loader: "art-template-loader",
                options: {
                    escape: false
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    }
}