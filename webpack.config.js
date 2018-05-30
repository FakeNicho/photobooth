const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync(process.env.CONFIG || path.join(__dirname, 'config.json')));
const skipAuth = process.env.SKIP_AUTH === 'true' || !config.username || !config.password;

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: ['babel-polyfill', 'webpack-hot-middleware/client', './src/frontend/main'],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public/dist'),
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
      __DEVTOOLS__: process.env.DEVTOOLS === 'true',
      CONFIG: {
        imgUrl: JSON.stringify(config.imgUrl),
        headerText: JSON.stringify(config.headerText),
        skipAuth,
      },
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
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
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
