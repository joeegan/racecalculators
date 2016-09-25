/* eslint-disable no-var, import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index',
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src'),
      },
    ],
  },
};
