const path = require('path');

const {HotModuleReplacementPlugin} = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    host: '0.0.0.0',
    contentBase: path.resolve('static'),
    historyApiFallback: true,
  },
  plugins: [new HotModuleReplacementPlugin()],
});
