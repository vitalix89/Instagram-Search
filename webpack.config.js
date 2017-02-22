
const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: [
    './src/index.js'
  ],
  devtool: 'source-map',
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },


  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],


  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-2'],
        plugins: ['transform-async-to-generator']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
