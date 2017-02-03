/* eslint-disable */
const babelConfig = require('../configuration/babel/babel.dev');

require('babel-register')(babelConfig);
const hook = require('css-modules-require-hook');

hook({ generateScopedName: '[name]__[local]' });

var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var express = require('express');
var favicon = require('serve-favicon');
var utils = require('./utils');

var React = require('react');
var ReactDOMServer = require('react-dom/server');
var StaticRouter = require('react-router-dom').StaticRouter;
var Html = require('../src/components/html').default;
var Routes = require('../src/routes/routes').default;

var PORT = process.env.PORT || 80;

// Launch server
var app = express();

app.use(express.static('./build'));

app.use(favicon('./build/favicon.png'));

app.get('*', (req, res) => {
  const context = {};

  const stats = require('../build/stats.json');

  const assetsByChunkName = stats.assetsByChunkName;

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
  console.log(chalk.cyan('Production server started on port ' + PORT));
  console.log();
});
