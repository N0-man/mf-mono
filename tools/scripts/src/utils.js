const fs = require('fs');
const { access } = fs.promises;

async function fileExists (filePath) {
  try {
    await access(filePath, fs.constants.F_OK);

    return true;
  } catch (e) {}

  return false;
}

module.exports = {
  fileExists,
};
