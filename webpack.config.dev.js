const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8081',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    './src/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 8015
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'DB_HOST': JSON.stringify('localhost'),
        'DB_PORT': 28015,
        'DB_PATH': JSON.stringify('/db'),
        'DB_SECURE': false,
        'DB_NAME': JSON.stringify('battledb'),
        'SERVER_PORT': 8015,
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react', 'stage-2'],
        plugins: ["react-hot-loader/babel", "transform-object-rest-spread"]
      }
    },{
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    },{
      test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
      loader: 'url'
    },
    { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  },
}