var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var src = path.resolve('src');
var node_modules = path.resolve('node_modules');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client?quiet=true&noInfo=true',
    require.resolve('react-hot-loader/patch'),
    require.resolve('../polyfills/polyfills'),
    path.join(src, 'index'),
  ],
  output: {
    path: path.resolve('build'),
    pathinfo: true,
    filename: 'static/js/bundle.js',
    publicPath: '/',
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
    moduleTemplates: ['*-loader'],
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: src,
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        include: src,
        loader: 'babel',
        query: require('../babel/babel.dev'),
      },
      {
        test: /\.css$/,
        include: [src, node_modules],
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss'
      },
      {
        test: /\.json$/,
        include: [src, node_modules],
        loader: 'json',
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
        include: [src, node_modules],
        loader: 'file',
        query: {
          name: 'static/media/[name].[ext]',
        },
      },
      {
        test: /\.(mp4|webm)(\?.*)?$/,
        include: [src, node_modules],
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/media/[name].[ext]',
        },
      },
    ],
  },
  eslint: {
    configFile: path.resolve('./configuration/eslint/eslint.js'),
    useEslintrc: false,
  },
  postcss: function() {
    return [autoprefixer];
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('index.html'),
      favicon: path.resolve('favicon.png'),
    }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
    // Note: only CSS is currently hot reloaded
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
