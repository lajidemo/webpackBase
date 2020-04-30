const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: '[name].[hash].js',
    path: __dirname+'/dist',
    publicPath: '/',
    library:'webpack-demo',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader','postcss-loader'],
        exclude: /node_modules/,
        include: /src/,
      }, {
        test: /\.(sass|scss)$/,
        use: ['style-loader','css-loader','postcss-loader','sass-loader'],
        exclude: /node_modules/,
        include: /src/,
      }, {
        test:/\.vue$/,
        loader:'vue-loader',
        exclude:/node_modules/,
        include:/src/
      }, {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: /src/,
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000,
          }
        },
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([{
      from: __dirname + '/public',
      to: __dirname + '/dist',
      ignore: ['.*']
    }]),
    new HtmlWebpackPlugin({
      template:'public/index.html'
    })
  ],
  devServer: {
    contentBase: __dirname + '/dist',
    host: 'localhost',
    port: 8080,
    hot: true,
    open: true,
    openPage: 'index.html',
    proxy: {
      '/api': {
        target: 'http://lemall.futurefe.com'
      }
    }
  }
}