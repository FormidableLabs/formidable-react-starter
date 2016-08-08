require('babel-register')({
  presets: [
    'babel-preset-es2015',
    'babel-preset-stage-0',
    'babel-preset-react',
  ],
  plugins: ['react-hot-loader/babel'],
});

require('css-modules-require-hook')({
  generateScopedName: '[local]',
});

var jsdom = require('jsdom').jsdom;

var chai = require("chai");
var sinonChai = require("sinon-chai");

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;

global.expect = chai.expect;

chai.use(sinonChai);

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

documentRef = document;
