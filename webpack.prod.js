const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const common = require('./webpack.common.js');

const extractScss = new ExtractTextPlugin('styles.css');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractScss.extract([
          {
            loader: 'css-loader',
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
