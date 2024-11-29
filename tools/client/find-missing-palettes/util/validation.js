const {existsSync} = require('fs');
const {resolve} = require('path');
const {PALETTE_DIR} = require('./data/translations');

module.exports = {getPaletteRoot};

function getPaletteRoot() {
  const dataPath = process.argv[2];
  if(!dataPath) {
    console.error('You must extract your GRF and then provide a path to it, relative to your current directory. Example: "../rathena-client/data"');
    process.exit(1);
  }

  //Check top-level data
  const resolved = resolve(process.cwd(), dataPath);
  if(!existsSync(resolved)) {
    console.error(`Data path doesn't exist: "${resolved}"`);
    process.exit(1);
  }

  //Check palette dir
  const resolvedPalette = resolve(resolved, PALETTE_DIR);
  if(!existsSync(resolvedPalette)) {
    console.error(`Palette path doesn't exist: "${resolvedPalette}"`);
    process.exit(1);
  }

  return resolvedPalette;
}
