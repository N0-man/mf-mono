const path = require('path');
const Project = require("@lerna/project");

const PACKAGES_FOLDER = 'packages';
const TOOLS_FOLDER = 'tools';

function getPackageGroup (pkgPath, rootPath) {
  return path.relative(rootPath, path.dirname(pkgPath))
}

function isPackage (pkgPath, rootPath) {
  const pkgGroup = getPackageGroup(pkgPath, rootPath);

  return pkgGroup === PACKAGES_FOLDER;
}

async function getPackages () {
  const project = new Project(process.cwd());
  const packages = await project.getPackages();
  const pkgMap = new Map();
  const rootPath = project.rootPath;

  packages.forEach(pkg => {
    pkgMap.set(pkg.name, {
      path: pkg.location,
      isPackage: isPackage(pkg.location, rootPath),
    });
  });

  return pkgMap;
}

module.exports = getPackages;
