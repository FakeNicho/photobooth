const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync(process.env.CONFIG || path.join(__dirname, 'config.json')));
const skipAuth = process.env.SKIP_AUTH === 'true' || !config.username || !config.password;

module.exports = {
  mode: 'production',
  entry: ['babel-polyfill', './src/frontend/main'],
  output: {
    filename: 'bundle.min.js',
    path: path.join(__dirname, 'public/dist'),
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      __DEVTOOLS__: false,
      CONFIG: {
        imgUrl: JSON.stringify(config.imgUrl),
        headerText: JSON.stringify(config.headerText),
        skipAuth,
      },
    }),
    new ExtractTextPlugin({filename: 'master.min.css', allChunks: true}),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {discardComments: {removeAll: true}},
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.template.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader'),
        include: path.join(__dirname, 'src/sass'),
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src/frontend'),
      },
    ],
  },
};
