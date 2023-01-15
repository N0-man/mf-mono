module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: {
          version: 3,
          proposals: true,
        },
      },
    ],
    ["@babel/preset-react", {
      "runtime": "automatic"
    }],
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    'import-glob',
    'jsx-control-statements',
    'dev-expression',
  ],
  env: {
    production: {
      plugins: ["transform-remove-console", "transform-react-remove-prop-types"],
    },
  },
};
