const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    index: { import: './src/index.tsx' },
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.[hash].js',
    publicPath: '/',
    clean: true,
  },

  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    alias: {
      '@src': path.resolve(__dirname, './src'),
    },
  },

  plugins: [
    new HTMLWebpackPlugin({
      favicon: './src/favicon.ico',
      template: './src/index.html',
    }),
    new Dotenv(),
  ],

  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        exclude: /node_modules/,
        type: 'asset/resource',
      },
      {
        test: /\.m?(js|jsx|ts|tsx)$/i,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        exclude: /node_modules/,
        type: 'asset/resource',
      },
    ],
  },
};
