const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common')
const { merge } = require('webpack-merge')

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          modules: true
        }
      }, {
        loader: 'sass-loader'
      }]
    }, {
      test: /\.svg$/,
      use: [
        {
          loader: 'svg-url-loader',
          options: {
            limit: 10000
          }
        }
      ]
    }]
  },
  plugins: [
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify('https://dev-api.proposify.com/api'),
      'process.env.CLIENT_ID': JSON.stringify('c1004f178078c83149f55681c8801469'),
      'process.env.CLIENT_SECRET': JSON.stringify('23a166987783cde870932d3040c0880fc72c979dd6b5266437b9aedb033fd2ae')
    }),
    new HtmlWebpackPlugin({
      template: './template.dev.html'
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    port: 8080,
    allowedHosts: [
      'reginaldodev.proposify.com',
      'dev-api.proposify.com',
      'proposify.com',
      '.proposify.com'
    ]
  }
})
