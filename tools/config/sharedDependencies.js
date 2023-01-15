const { getModuleVersion } = require('./utils');

module.exports = {
  react: {
    eager: true,
    singleton: true,
    requiredVersion: getModuleVersion('react'),
  },
  "react-dom": {
    eager: true,
    singleton: true,
    requiredVersion: getModuleVersion('react-dom'),
  },
};
