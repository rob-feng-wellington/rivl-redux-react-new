const webpack = require('webpack');
const path = require('path');

module.exports = {  
  devtool: 'source-map',

  entry: [
    'babel-polyfill',
    './src/index.jsx'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'DB_HOST': JSON.stringify('localhost'),
        'DB_PORT': 28015,
        'DB_PATH': JSON.stringify('/db'),
        'DB_SECURE': false,
        'DB_NAME': JSON.stringify('battledb'),
        'SERVER_PORT': 5000,
      }
    })
  ],

   module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      { test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/ },
      {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    },
      { test: /\.png$/,
        loader: 'file' },
      {
        test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
        loader: 'url'
      },
      { test: /\.css$/, 
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
 }

