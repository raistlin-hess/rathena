
const {existsSync} = require('fs');
const {access, constants: FS_CONSTANTS, writeFile, copyFile} = require('fs/promises');
const {resolve, sep} = require('path');
const {SingleBar} = require('cli-progress');
const {MALE, FEMALE} = require('../data/translations');

//Configuration based on intended client/server support
//Note: Not 0-indexed
const MAX_CLOTH_COLOR = 700;
const progressBar = new SingleBar();

module.exports = {main};

async function main(uniqueGravityFiles) {
  // Validate paths and get root of palettes
  const paletteRoot = getPaletteRoot();

  //Check if every variation of paletteToJobMap key, sex, and index exists.
  const missingFiles = await checkAllFiles(uniqueGravityFiles, paletteRoot);

  //Copy default palette to fill in missing files, if any
  if(missingFiles.length > 0) {
    await addMissingFiles(missingFiles);
  }
}

function getPaletteRoot() {
  const dataPath = process.argv[3];
  if(!dataPath) {
    printUsage('You must extract your GRF and then provide a path to it, relative to your current directory. Example: "../rathena-client/data"');
    process.exit(1);
  }

  //Check top-level data
  const resolved = resolve(process.cwd(), dataPath);
  if(!existsSync(resolved)) {
    printUsage(`Data path doesn't exist: "${resolved}"`);
    process.exit(1);
  }

  //Check palette dir
  const resolvedPalette = resolve(resolved, 'palette');
  if(!existsSync(resolvedPalette)) {
    printUsage(`Palette path doesn't exist: "${resolvedPalette}"`);
    process.exit(1);
  }

  return resolvedPalette;
}

async function checkAllFiles(uniqueGravityFiles, paletteRoot) {
  const expectedFileCount = (MAX_CLOTH_COLOR + 1) * uniqueGravityFiles.length * 2; // Cloth index is not 0-based, and account for male/female
  console.info(`Scanning "${paletteRoot}"`);
  progressBar.start(expectedFileCount, 0);

  const filePromises = uniqueGravityFiles.flatMap(gravityPalette => {
    return [...Array(MAX_CLOTH_COLOR + 1).keys()]
      .flatMap(index => [
        checkFileExists(resolve(paletteRoot, `${gravityPalette.split(`palette${sep}`)[1]}_${MALE}_${index}.pal`), `${gravityPalette}_${MALE}_0.pal`),
        checkFileExists(resolve(paletteRoot, `${gravityPalette.split(`palette${sep}`)[1]}_${FEMALE}_${index}.pal`), `${gravityPalette}_${FEMALE}_0.pal`),
      ]);
  });


  //Wait for results and stop progressbar
  const results = await Promise.allSettled(filePromises);
  progressBar.stop();

  //Organize results for output
  const missingFiles = results.filter(r => r.status === 'rejected')
    .map(r => r.reason);

  console.info([
    'Summary:',
    `Expected filecount: ${expectedFileCount}`,
    `Actual filecount: ${results.length - missingFiles.length}`,
    `Missing filecount: ${missingFiles.length}`,
  ].join('\n  '));

  //Write missing files to fs
  if(missingFiles.length > 0) {
    await writeFile('./missingFiles.log', `Missing files:\n  ${missingFiles.map(m => m.message).join('\n  ')}`);
    console.info('For more details about missing files, refer to "./missingFiles.log"');
  }

  return missingFiles;
}

//Returns nothing on success, but thrown error message contains the absolute path that failed, and cause contains metadata
async function checkFileExists(paletteName, gravityDefault) {
  try {
    await access(paletteName, FS_CONSTANTS.R_OK);
  } catch(err) {
    //Simplify error to contain absolute path
    throw new Error(paletteName, {cause: {gravityDefault}});
  } finally {
    progressBar.increment();
  }
}

async function addMissingFiles(missingFiles) {
  console.info('Copying default Gravity palettes to replace missing files.');

  //Wait for results and log
  progressBar.start(missingFiles.length, 0);
  const copyPromises = await Promise.allSettled(
    missingFiles.map(err => copyDefaultPalette(err.cause.gravityDefault, err.message))
  );
  progressBar.stop();

  const failedCopies = copyPromises.filter(r => r.status === 'rejected')
    .map(r => r.reason);

  console.info([
    'Summary:',
    `Files created: ${copyPromises.length - failedCopies.length}`,
    `Failed creations: ${failedCopies.length}`,
  ].join('\n  '));

  if(failedCopies.length > 0) {
    //Write failed files to fs
    await writeFile('./failedCopies.log', `Failed copies:\n  ${failedCopies.map(f => f.message).join('\n  ')}`);
    console.info('For more details about failed copies, refer to "./failedCopies.log"');
  }
}

async function copyDefaultPalette(source, target) {
  try {
    await copyFile(source, target);
    return target;
  } catch(err) {
    //Simplify error to contain absolute path
    throw new Error(target);
  } finally {
    progressBar.increment();
  }
}
