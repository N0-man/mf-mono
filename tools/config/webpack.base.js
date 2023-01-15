const path = require('path');
// const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SizePlugin = require('size-plugin');
const chalk = require('chalk');

const { getConfig } = require('./utils');

const baseConfigFactory = function (options) {
  const { pkgRoot, env } = options ?? { env: process.env.NODE_ENV };
  const IS_PRODUCTION =  env === 'production';
  const mfConfig = getConfig(pkgRoot);
  const { paths } = mfConfig;

  const baseConfig = {
    target: 'browserslist',
    mode: env === 'production' ? 'production' : 'development',

    entry: {
      app: [path.resolve(paths.APP_DIR, './src/index.js')],
    },

    resolve: {
      alias: {
        'react/jsx-runtime': require.resolve('react/jsx-runtime'),
      },
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              configFile: path.resolve(paths.CONFIG_DIR, './babel.config'),
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpg|xlsx|gif)$/,
          use: ['file-loader']
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        template: require.resolve('@mf/config/index.html'),
      }),
    ],

    output: {
      filename: '[name].[chunkhash].min.js',
      path: paths.DIST_DIR,
      publicPath: '/',
    },
  };

  if (IS_PRODUCTION) {
    baseConfig.optimization = {
      minimize: true,
      minimizer: [new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          ecma: 5,
          mangle: true,
          ie8: false,
          safari10: false
        }
      })],
    };

    baseConfig.plugins.push(
      new SizePlugin(),
    );
  }


  return baseConfig;
};

module.exports = baseConfigFactory;
