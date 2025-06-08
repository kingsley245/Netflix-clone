const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin'); // importing the webpack plugin

module.exports = {
  entry: './src/index.js', // Entry file
  output: {
    filename: 'bundle.js', // Output bundle
    path: path.resolve(__dirname, 'dist') // Output folder
  },
  mode: 'development', // or 'development'
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'src')
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'My Webpack App',
      filename: 'index.html'
    })
  ]
};
