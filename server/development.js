/* eslint-disable */
const babelConfig = require('../configuration/babel/babel.dev');

require('babel-register')(babelConfig);
const hook = require('css-modules-require-hook');

hook({ generateScopedName: '[name]__[local]' });

var path = require('path');
var historyApiFallback = require('connect-history-api-fallback');
var chalk = require('chalk');
var express = require('express');
var favicon = require('serve-favicon');
var webpack = require('webpack');
var config = require('../configuration/webpack/webpack.config.dev');
var utils = require('./utils');

var React = require('react');
var ReactDOMServer = require('react-dom/server');
var StaticRouter = require('react-router-dom').StaticRouter;
var Html = require('../src/components/html').default;
var Routes = require('../src/routes/routes').default;

process.env.NODE_ENV = 'development';

var PORT = process.env.PORT || 3000;

// Set up compiler
var compiler = webpack(config);

compiler.plugin('invalid', () => {
  utils.clearConsole();
  console.log('Compiling...');
});

compiler.plugin('done', stats => {
  utils.formatStats(stats, PORT);
});

// Launch server
var app = express();

//app.use(historyApiFallback({ verbose: false }));
app.use(
  require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    serverSideRender: true
  })
);

app.use(require('webpack-hot-middleware')(compiler));

app.use(favicon('./favicon.png'));

app.use(express.static('./public'));

app.get('*', (req, res) => {
  const context = {};

  const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;

  const Component = React.createElement(
    StaticRouter,
    { location: req.url, context: context },
    React.createElement(Routes)
  );

  const markup = ReactDOMServer.renderToString(
    React.createElement(Html, {
      component: Component,
      assets: assetsByChunkName
    })
  );

  res.write(markup);
  res.end();
});

app.listen(PORT, err => {
  if (err) {
    console.log(err);
    return;
  }

  utils.clearConsole();
  console.log(chalk.cyan('Starting the development server...'));
  console.log();
});
