const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { DefinePlugin } = require('webpack')

module.exports = {
  mode: 'development',
  entry: './src/main/index.tsx',
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: 'bundle.js',
    publicPath: '/public/js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'scss'],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
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
    new CleanWebpackPlugin(),
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify('https://dev-api.proposify.com/api'),
      'process.env.CLIENT_ID': JSON.stringify('c1004f178078c83149f55681c8801469'),
      'process.env.CLIENT_SECRET': JSON.stringify('23a166987783cde870932d3040c0880fc72c979dd6b5266437b9aedb033fd2ae')
    })
  ],
  devServer: {
    contentBase: './public',
    writeToDisk: true,
    historyApiFallback: true,
    port: 8080,
    allowedHosts: [
      'reginaldodev.proposify.com',
      'proposify.com',
      '*.proposify.com'
    ]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
}
