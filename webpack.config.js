'use strict'

var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        compact: false,
        presets: ['es2015', 'stage-0'],
        plugins: [
          ['transform-decorators-legacy']
        ]
      }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html',
      inject: 'body',
      title: 'Application'
    }),
    new CopyWebpackPlugin([
      {from: 'phaser/build/phaser.min.js'},
      {from: 'assets/*'},
      {from: 'assets/font/*'}
    ])
  ],
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    stats: true
  }
}
