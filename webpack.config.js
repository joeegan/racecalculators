/* eslint-disable no-var, import/no-extraneous-dependencies */
const pkg = require('./package.json');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const curry = require('lodash/curry');
const ifVal = (cond, val) => !!cond ? val : undefined;
const filterExists = (a) => a.filter(Boolean);

module.exports = (env) => {
  const ifProd = curry(ifVal)(env.prod);
  const ifDev = curry(ifVal)(env.dev);
  const NODE_ENV = env.prod ? 'production' : 'development';
  return {
    entry: './index',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.[hash].js',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    context: path.resolve(__dirname, 'src'),
    devtool: env.prod ? 'source-map' : 'eval-source-map',
    bail: env.prod,
    plugins: filterExists([
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(NODE_ENV),
        },
        VERSION: JSON.stringify(pkg.version),
      }),
      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      })),
      ifDev(new webpack.HotModuleReplacementPlugin()),
    ]),
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          include: path.join(__dirname, 'src'),
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
        },
        {
          test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
          loader: 'file-loader?name=[name].[ext]',
        },
      ],
    },
  };
};
