module.exports = {
  presets: [
    [ 'babel-preset-es2015' ],
    'babel-preset-stage-0',
    'babel-preset-react'
  ],
  plugins: [ 'babel-plugin-transform-react-constant-elements' ]
    .map(require.resolve)
    .concat([ [ require.resolve('babel-plugin-transform-runtime') ] ])
};
