const path = require('path');
const { Command, flags } = require('@oclif/command');
const inquirer = require('inquirer');

const server = require('../tasks/server');

const getPackages = require('../lib/getPackages');

class Start extends Command {
  static description = 'Run the server';

  static args = [
    { name: 'scope', required: false },
  ];

  static flags = {
    scope: flags.string({ description: 'package name', required: false }),
  };

  static strict = false;
  #packageList;

  async getPackages () {
    if (!Start.packageList) {
      this.#packageList = await getPackages();
    }

    return Promise.resolve(this.#packageList);
  }

  async run () {
    const { args, flags } = this.parse(Start);
    let scope = args.scope || flags.scope;

    const packageList = await this.getPackages();

    if (!scope) {
      const packages = []
      packageList.forEach((pkgDetails, pkgName) => {
        if (pkgDetails.isPackage) {
          packages.push({ name: pkgName });
        }
      });

      const responses = await inquirer.prompt([{
        name: 'selectedScope',
        message: 'Select a package',
        type: 'list',
        choices: packages,
      }]);

      scope = responses.selectedScope
    }

    if (packageList.has(scope) && packageList.get(scope).isPackage) {
      await this.startServer(scope);
    }
  }

  async startServer(scope) {
    const packageList = await this.getPackages();

    const pkgDetails = packageList.get(scope);

    if (pkgDetails.isPackage) {
      const options = {
        pkgRoot: pkgDetails.path,
      };

      await server(options);
    }
  }
}

module.exports = Start;
