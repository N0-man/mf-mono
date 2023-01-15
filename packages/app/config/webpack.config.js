const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

const baseConfigFactory = require('@mf/config/webpack.base');
const sharedDependencies = require('@mf/config/sharedDependencies');

const webpackConfigFactory = function (options) {
  const baseConfig = baseConfigFactory(options);
  const { env } = options ?? {};

  const webpackConfig = {
    plugins: [
      new ModuleFederationPlugin({
        remoteType: 'var',
        name: 'AppShell',
        library: { type: "var", name: "AppShell" },
        remotes: {
          '@mf/header': 'mfHeader',
          '@mf/data': 'mfData',
        },
        shared: {
          ...sharedDependencies,
        },
      }),
      new HtmlWebpackTagsPlugin({
        tags: ["http://localhost:3000/remoteEntry.js", "http://localhost:3001/remoteEntry.js"],
        append: false,
        publicPath: false,
      }),
    ],
  };

  // const webpackConfig = {
  //   plugins: [
  //     new ModuleFederationPlugin({
  //       name: 'main_app',
  //       remotes: {
  //         'header': 'header@http://localhost:3000/remoteEntry.js',
  //         'data': 'data@http://localhost:3001/remoteEntry.js',
  //       },
  //     }),
  //     new HtmlWebpackPlugin({
  //       template: './public/index.html',
  //     }),
  //   ],
  // };

  return merge(baseConfig, webpackConfig);
};

module.exports = webpackConfigFactory;
