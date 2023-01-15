const path = require('path');
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const baseConfigFactory = require('@mf/config/webpack.base');
const sharedDependencies = require('@mf/config/sharedDependencies');

const webpackConfigFactory = function (options) {
  const baseConfig = baseConfigFactory(options);
  const { env, pkgRoot } = options ?? {};

  const webpackConfig = {
    output: {
      publicPath: 'http://localhost:3001/',
    },
    plugins: [
      new ModuleFederationPlugin({
        remoteType: 'var',
        name: 'mfData',
        library: { type: "var", name: "mfData" },
        filename: 'remoteEntry.js',
        exposes: {
          './Component': path.resolve(pkgRoot, './src/Data'),
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
