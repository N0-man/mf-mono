const path = require('path');
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
// const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");

const baseConfigFactory = require('@mf/config/webpack.base');
const sharedDependencies = require('@mf/config/sharedDependencies');

const webpackConfigFactory = function (options) {
  const baseConfig = baseConfigFactory(options);
  const { env, pkgRoot } = options ?? {};

  const webpackConfig = {
    output: {
      publicPath: 'http://localhost:3000/',
    },
    plugins: [
      new ModuleFederationPlugin({
        remoteType: 'var',
        name: 'mfHeader',
        library: { type: "var", name: "mfHeader" },
        filename: 'remoteEntry.js',
        exposes: {
          './Component': path.resolve(pkgRoot, './src/Header'),
        },
        shared: {
          ...sharedDependencies,
        },
      }),
    ],
  };

  return merge(baseConfig, webpackConfig);
};

module.exports = webpackConfigFactory;
