'use strict';

const path = require('path');
const util = require('util');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const chalk = require('chalk');

const { getConfig } = require('@mf/config/utils');
const { fileExists } = require('../utils');

let currentServer;

process.on('unhandledRejection', err => {
  throw err;
});

process.on('uncaughtException', err => {
  if (err.code === 'EADDRINUSE') {
    console.log();
    console.log(
      chalk.red('%s server is already running at %s'),
      chalk.bold(currentServer.serverName),
      chalk.bold(currentServer.serverAddress),
    );
    console.log();
    process.exit(1);
  }

  throw err;
});

async function devServer(options) {
  const mfConfig = getConfig(options.pkgRoot);
  const port = mfConfig.port;
  const host = '127.0.0.1' || mfConfig.host;

  const configPath = mfConfig.configPaths.webpack;

  if (!await fileExists(configPath)) {
    console.error(`"${configPath}" does not exist`);
    process.exit(1);
  }

  const configFactory = require(configPath);
  const config = configFactory({ pkgRoot: options.pkgRoot, env: process.env.NODE_ENV });

  const compiler = webpack(config);
  const app = express();

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
    })
  );

  app.use('*', (req, res) => {
    const filename = path.join(compiler.outputPath, './index.html');

    compiler.outputFileSystem.readFile(filename, (err, result) => {
      res.set('content-type', 'text/html');
      res.set('Access-Control-Allow-Origin', "*");
      res.set('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, PATCH, OPTIONS");
      res.set('Access-Control-Allow-Headers', "X-Requested-With, content-type, Authorization");
      if (err) {
        res.send(`<meta http-equiv="refresh" content="1">
          <h1 style="line-height: 100vh; text-align: center;">Hold your horses! Still bundling the files…</h1>`);
      } else {
        res.send(result);
      }

      res.end();
    });
  });

  const serverAddress = util.format('%s://%s:%s/', 'http', host, port);
  currentServer = {
    serverAddress,
    serverName: mfConfig.name,
  };

  const server = app.listen(port, host, function (err) {
    if (err) {
      throw err;
    }

    const address = server.address();
    console.log();
    console.log(
      chalk.yellowBright(`Running %s at ${chalk.cyan.bold('%s://%s:%s/')}`),
      chalk.bold(mfConfig.name),
      'http', address.address, address.port,
    );
    console.log();
  });

  ['SIGINT', 'SIGTERM'].forEach(function (sig) {
    process.on(sig, function () {
      console.log('\nQuitting dev-server!');
      server.close();
      process.exit();
    });
  });
}

module.exports = devServer;
