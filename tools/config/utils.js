const fs = require('fs');
const path = require('path');
const merge = require('deepmerge');
const getDefaultConfig = require('./defaultConfig');

const mergeOptions = {};

function mergeConfig (defaultConfig, pkgConfig) {
  return merge(defaultConfig, pkgConfig, mergeOptions);
}

function getConfig (pkgRoot) {
  const pkgPath = pkgRoot ?? process.cwd();
  const defaultConfig = getDefaultConfig(pkgPath);
  const configFile = path.resolve(`${pkgPath}/mf.config.js`);

  try {
    fs.accessSync(configFile, fs.constants.R_OK | fs.constants.W_OK);
    const pkgConfig = require(configFile);

    return mergeConfig(defaultConfig, pkgConfig);
  } catch (e) {
  }

  return defaultConfig;
}

function getModuleVersion (moduleName) {
  const modulePath = path.dirname(require.resolve(moduleName));

  const modulePkg = require(`${modulePath}/package.json`);

  return modulePkg.version;
}

module.exports = {
  getConfig,
  getModuleVersion,
};
