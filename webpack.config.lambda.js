const path = require('path');
const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const outputPath = path.join(__dirname, 'dist', 'lambda-ssr');
const isProduction = process.env.NODE_ENV !== 'development';

// eslint-disable-next-line no-console
console.log('Building lambda ssr for environment:', isProduction ? 'production' : 'development');

module.exports = {
  bail: isProduction,
  context: __dirname,
  entry: ['babel-polyfill', './src/ssrLambdaHandler.js'],
  output: {
    path: outputPath,
    filename: 'bundle.js',
    libraryTarget: 'commonjs',
    library: 'ssr',
  },
  target: 'node',
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
    new webpack.NoEmitOnErrorsPlugin(),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
    }),
	new CopyWebpackPlugin([
    { from: 'lambda.js', to: outputPath },
	  { from: './src/index.ejs', to: outputPath }
    ]),
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
    ],
  },
};
