var path = require('path');
var webpack = require('webpack');

var node_modules_dir = path.resolve(__dirname, 'node_modules');

module.exports = {
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      // There is not need to run the loader through
      // vendors
      exclude: [node_modules_dir],      
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    },
    {test: /\.(jpg|png|gif)$/, loader: 'file',},
    ]
  }
};
