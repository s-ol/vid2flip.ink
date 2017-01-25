var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var pkg = require('./package');

module.exports = {
  entry: {
    index: './js/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle.js',
    publicPath: '/'
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style/useable!css!postcss!'
      },
      {
        test: /\.less$/,
        loader: 'style!css!postcss!less!'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'react-hot!babel?presets[]=react&presets[]=es2015',
        exclude: /(node_modules)/
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)\w*/,
        loader: 'file'
      }
    ]
  },
  postcss: function() {
    return [
      autoprefixer({browsers: ['last 5 versions']})
    ];
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [
      path.resolve(__dirname)
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.bundle.js'),
    new HtmlWebpackPlugin({
      title: 'vid2flip.ink',
      description: 'a webservice for printing gif flipbooks',
      username: 's-ol',
      filename: 'index.html',
      inject: 'body',
      template: 'index.html_vm',
      favicon: 'img/favicon.ico',
      hash: false
    })
  ]
};
