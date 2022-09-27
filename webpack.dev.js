const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge').merge;
const commonConf = require('./webpack.common');
const outputFile = '[name]';
const assetFile = '[name]';
module.exports = () => webpackMerge(commonConf({outputFile, assetFile}),{
  mode: 'development', 
  devtool: 'source-map',
  target: 'web',
  devServer: {
    open: true,
    hot: false,
    liveReload: true,
    static: {
      directory: './public',
      watch:true
    }
  },
  plugins: [
    new ESLintPlugin({
      extensions: '.js',
      exclude: 'node_modules',
      fix: true
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      chunks: ['app']
    }),
    new HtmlWebpackPlugin({
      template: './src/other.html',
      filename: 'other.html',
      inject: 'body',
      chunks: ['sub']
    }),
  ]
});