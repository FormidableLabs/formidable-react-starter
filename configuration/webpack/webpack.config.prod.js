var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var url = require('url');

var src = path.resolve('src');
var node_modules = path.resolve('node_modules');

var publicPath = '/';

module.exports = {
  bail: true,
  devtool: 'source-map',
  entry: [
    require.resolve('../polyfills/polyfills'),
    path.join(src, 'index')
  ],
  output: {
    path: path.resolve('build'),
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: publicPath
  },
  resolve: {
    extensions: ['', '.js', '.json'],
    packageMains: [
      'jsnext:main',
      'main',
    ],
  },
  resolveLoader: {
    root: node_modules,
    moduleTemplates: ['*-loader']
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: src
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        include: src,
        loader: 'babel',
        query: require('../babel/babel.prod')
      },
      {
        test: /\.css$/,
        include: [src, node_modules],
        loader: ExtractTextPlugin.extract(
          {
            fallbackLoader: 'style',
            loader: 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]-autoprefixer!postcss',
          }
        ),
      },
      {
        test: /\.json$/,
        include: [src, node_modules],
        loader: 'json'
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
        include: [src, node_modules],
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(mp4|webm)(\?.*)?$/,
        include: [src, node_modules],
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  eslint: {
    configFile: path.join(__dirname, '../eslint/eslint.js'),
    useEslintrc: false
  },
  postcss: function() {
    return [autoprefixer];
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('index.html'),
      favicon: path.resolve('favicon.png'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new ExtractTextPlugin('static/css/[name].[contenthash:8].css')
  ]
};
