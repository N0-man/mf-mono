const baseConfigPath = require.resolve('@mf/config/babel.base');

module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    babelOptions: {
      configFile: baseConfigPath,
    },
  },
  env: {
    node: true,
    es6: true,
  },

  extends: 'oclif',
  rules: {
    semi: [2, 'always'],
    'object-curly-spacing': [2, 'always'],
  },
};
