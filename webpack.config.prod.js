const webpack = require('webpack');
const path = require('path');

module.exports = {  
  devtool: 'source-map',

  entry: [
    'babel-polyfill',
    './src/index'
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
        'DB_PORT': 15329,
        'DB_PATH': JSON.stringify('/'),
        'DB_SECURE': false,
        'DB_NAME': JSON.stringify('versus'),
        'SERVER_PORT': 3000
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
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file'},
      { test: /\.css$/, 
        loaders: ['style-loader', 'css-loader']
      }
    ]
  }
 }

