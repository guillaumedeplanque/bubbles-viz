'use strict'

var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var LiveReloadPlugin = require('webpack-livereload-plugin')

var env = process.env.NODE_ENV

var config = {
  entry: './src/App.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: ["es2015"]
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
            name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(env)}),
    new ExtractTextPlugin("bundle.css"),
    new LiveReloadPlugin({'port': 3003, 'hostname': 'localhost'})
  ]
}

module.exports = config
