const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const {ProvidePlugin} = require('webpack');


module.exports = ({outputFile, assetFile}) =>  ({
  entry: {app:'./src/js/app.js', sub:'./src/js/sub.js'},
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: `${outputFile}.js`,
    chunkFilename: `${outputFile}.js`
  },
  module: {
    rules: [
      {
        test:/\.js$/,
        exclude: /node-modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /.(png|svg|jpe?g|gif)$/,
        type: "asset/resource",
        generator: {
          filename: `images/${assetFile}.[ext]`
        }
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${outputFile}.css`
    }),
    new ESLintPlugin({
      extensions: '.js',
      exclude: 'node_modules',
      fix: true
    }),
    new ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      utils: [path.resolve(__dirname, 'src/js/utils'),'default']
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        vendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        utils: {
          name: "utils",
          test: /src[\\/]/,
          chunks: 'async'
        },
        default: false,
      }
    }
  },
  resolve: {
    alias: {
      '@scss': path.resolve(__dirname, 'src/scss'),
      '@imgs': path.resolve(__dirname, 'src/images')
    },
    extensions: ['.js', '.scss'],
    modules: [path.resolve(__dirname, 'src'),'node_modules']
  }
});