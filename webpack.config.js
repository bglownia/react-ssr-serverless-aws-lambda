const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

const outputPath = path.join(__dirname, 'dist');
const isProduction = process.env.NODE_ENV !== 'development';

// eslint-disable-next-line no-console
console.log('Building front-end for environment:', isProduction ? 'production' : 'development');

module.exports = {
  bail: isProduction,
  context: __dirname,
  devtool: isProduction ? 'source-map' : 'cheap-source-map',
  entry: {
    app: ['babel-polyfill', './src/index.jsx'],
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'redux',
      'redux-thunk',
      'reselect',
    ],
  },
  output: {
    path: outputPath,
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    modules: [
      __dirname,
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
  },
  stats: {
    assets: true,
    colors: true,
    version: true,
    hash: true,
    timings: true,
    chunks: true,
    chunkModules: true,
    children: false,
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'debug') }),
    new webpack.NormalModuleReplacementPlugin(/\{ENV\}/, (resource) => {
      // eslint-disable-next-line no-param-reassign
      resource.request = resource.request.replace('{ENV}', isProduction ? 'prod' : 'dev');
    }),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      allChunks: true,
    }),
    (isProduction && new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
    })),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
    }),
  ].filter(plugin => plugin),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader?sourceMap', 'less-loader?sourceMap'],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader?sourceMap',
        }),
      },
      {
        test: /\.(html|xml|ico|png)$/,
        use: 'file-loader?name=[path][name].[ext]',
      },
    ],
  },
};
