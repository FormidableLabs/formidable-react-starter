import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import Helmet from 'react-helmet';

export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object
  };

  render() {
    const { assets, component } = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();

    return (
      <html lang="en-us">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {assets.main
            .filter(path => path.endsWith('.css'))
            .map(path => <link rel="stylesheet" key={path} href={path} />)}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          {assets.main
            .filter(path => path.endsWith('.js'))
            .map(path => <script key={path} src={path} />)}
        </body>
      </html>
    );
  }
}
