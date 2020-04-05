const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const path = require('path');

function createEnvKeys(env) {
    return Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {})
}

module.exports = (env, argv) => {
    let isDevelopment = argv.mode !== 'production';

    let envPath = path.join(__dirname) + '/.env' + (isDevelopment ? '.dev' : '');
    let variables = dotenv.config({ path: envPath }).parsed;
    const envKeys = createEnvKeys(variables);

    console.log('mode: ' + argv.mode)
    return {
        plugins: [
            new HtmlWebPackPlugin({
                template: "./src/index.html",
                filename: "./index.html"
            }),
            new CopyWebpackPlugin([]),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
                chunkFilename: '[id].[contenthash].css'
            }),
            new webpack.DefinePlugin(envKeys)
        ],
        output: {
            filename: '[name].[contenthash].js'
        },
        devServer: {
            contentBase: './dist',
            port: 4000
        },
        resolve: {
            extensions: ['.js', '.jsx', '.scss']
        }
    }
};