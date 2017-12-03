const path = require('path');
const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  context: __dirname,
  devtool: 'eval-cheap-module-source-map',
  entry: {
    app: ['webpack-hot-middleware/client', 'babel-polyfill', './src/index.jsx'],
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
    path: path.join(__dirname, 'dist'),
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'debug'),
    }),
    new webpack.NormalModuleReplacementPlugin(/\{ENV\}/, (resource) => {
      // eslint-disable-next-line no-param-reassign
      resource.request = resource.request.replace('{ENV}', isProduction ? 'prod' : 'dev');
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['react-hmre'],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
};
