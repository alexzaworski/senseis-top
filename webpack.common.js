const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const styleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  entry: {
    app: './src/client/index',
  },
  output: {
    path: path.resolve(__dirname, 'dist/static'),
    filename: 'app.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src'),
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Sensei's Top",
      hash: true,
      template: './src/client/template.ejs',
    }),
    new Dotenv(),
    new styleLintPlugin({
      configFile: '.stylelintrc',
      context: 'src/client/styles',
      files: '**/*.scss',
      failOnError: false,
      quiet: false,
      syntax: 'scss',
    }),
  ],
};
