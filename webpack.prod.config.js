var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var GhPagesWebpackPlugin = require('gh-pages-webpack-plugin');
var spawn = require('child_process').spawnSync;

module.exports = {
  entry: {
    index: './js/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[hash].[name].bundle.js',
    chunkFilename: '[hash].[id].bundle.js',
  },
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
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: [
            'react',
            'es2015'
          ]
        }
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('[hash].common.bundle.js'),
    new HtmlWebpackPlugin({
      title: 'vid2flip.ink',
      description: 'a webservice for printing gif flipbooks',
      username: 's-ol',
      filename: 'index.html',
      inject: 'body',
      template: 'index.html_vm',
      favicon: 'img/favicon.ico',
      hash: true
    }),
    new GhPagesWebpackPlugin({
      path: './build',
      options: {
        message: 'Update to ' + spawn('git', ['log', '-n1', '--format=%h: %s']).stdout,
        user: {
          name: 's-ol',
          email: 's-ol@users.noreply.github.com'
        }
      }
    })
  ]
};
