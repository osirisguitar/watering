const HTMLWebPackPlugin = require('html-webpack-plugin');
const HTMLWebPackPluginConfig = new HTMLWebPackPlugin({
  template: __dirname + '/lib/frontend/index.html',
  filename: 'index.html',
  inject: 'body',

});

module.exports = {
  entry: __dirname + '/lib/frontend/index.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    filename: 'transformed.js',
    path: __dirname + '/build'
  },
  plugins: [HTMLWebPackPluginConfig]
};
