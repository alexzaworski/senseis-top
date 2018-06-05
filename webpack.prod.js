const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractScss = new ExtractTextPlugin('styles.css');

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractScss.extract([
          {
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          },
          'postcss-loader',
          'sass-loader',
        ]),
      },
    ],
  },
  devtool: 'none',
  plugins: [extractScss],
});
