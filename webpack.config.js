const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',

  entry: ['@babel/polyfill', './src/index.tsx'],

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.[fullhash].js',
    publicPath: '/',
    clean: true,
  },

  devServer: {
    port: 3000,
    historyApiFallback: true,
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
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/public'),
          to: '',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new Dotenv(),
  ],

  module: {
    rules: [
      {
        test: /\.(scss|css)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
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

  devtool: 'source-map', // turn off on final production
};
