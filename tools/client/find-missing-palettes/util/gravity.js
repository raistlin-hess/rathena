const {readdir, access, constants: FS_CONSTANTS} = require('fs/promises');
const {resolve} = require('path');
const {SingleBar} = require('cli-progress');
const {printUsage} = require('./validation');
const {MALE} = require('../data/translations');

const progressBar = new SingleBar();

module.exports = {main};

async function main() {
  const gravityPaletteDir = await getGravityPaletteDir();
  console.info(`Scanning Gravity dir: "${gravityPaletteDir}"`);

  //Get unique files and return as an array
  const uniqueFiles = await getUniqueFiles(gravityPaletteDir);
  return [...uniqueFiles];
}

async function getGravityPaletteDir() {
  //Ensure user provide path
  const userDirArg = process.argv[2];
  if(!userDirArg) {
    printUsage(`Please provide a path relative to current directory to the official Gravity data directory, contained extracted contents of its "data.grf". Example: "../Ragnarok Online/data"`);
  }

  //Ensure path exists
  const gravityPaletteDir = resolve(process.cwd(), userDirArg, 'palette');
  try {
    await access(gravityPaletteDir, FS_CONSTANTS.R_OK);
  } catch(err) {
    console.error(err);
    printUsage(`Invalid path to Gravity data directory: "${gravityPaletteDir}"`);
  }

  //Ensure given path contains expected top-level dirs
  const KNOWN_PALETTES_SUB_DIRS = [
    'µµ¶÷Á·',
    '¸Ó¸®',
    '¸ö',
  ];
  const subdirs = await readdir(gravityPaletteDir);
  const matchCount = subdirs.reduce((prev, dir) => KNOWN_PALETTES_SUB_DIRS.includes(dir) ? prev + 1 : prev, 0);
  if(matchCount != KNOWN_PALETTES_SUB_DIRS.length) {
    const knownList = KNOWN_PALETTES_SUB_DIRS.map(k => `${gravityPaletteDir}/${k}`).join('\n    ');
    console.error(`Gravity data directory expected to contain the following directories:\n    ${knownList}`);
    process.exit(1);
  }

  return gravityPaletteDir;
}


async function getUniqueFiles(gravityPaletteDir) {
  const allFiles = (await readdir(gravityPaletteDir, {recursive: true, withFileTypes: true}))
    .filter(f => f.isFile())
    .filter(f => f.name.includes(MALE));

  progressBar.start(allFiles.length, 0);

  //Add all unique files to set
  const uniqueFiles = new Set();
  allFiles.forEach(f => {
    uniqueFiles.add(resolve(f.parentPath, f.name.split('_' + MALE + '_')[0]));
    progressBar.increment();
  });

  progressBar.stop();
  return uniqueFiles;
}
