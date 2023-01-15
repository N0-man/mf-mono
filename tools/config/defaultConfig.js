const path = require('path');

function getDefaultConfig(pkgRoot) {
  const packageDir = pkgRoot;
  const DIST_DIR = path.resolve(packageDir, './dist');
  const CONFIG_DIR = path.resolve(packageDir, './config');
  const pkgJSON = require(`${packageDir}/package.json`);

  return {
    name: pkgJSON.name,
    configPaths: {
      webpack: path.resolve(CONFIG_DIR, './webpack.config.js'),
    },
    paths: {
      APP_DIR: packageDir,
      DIST_DIR,
      CONFIG_DIR,
    },
    port: 3000,
  };
};

module.exports = getDefaultConfig;
