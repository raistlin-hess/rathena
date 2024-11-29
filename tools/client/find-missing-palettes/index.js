//First attempt; uses Sprite bible and some manual tweaks to assume which files should exist. Will match and place a default to fill in missing.
//Sadly, not comprehensive as there's no well-documented source of truth to what palettes are possible and for what class (past 4th job and costumes at least)

const {access, constants: FS_CONSTANTS, writeFile, copyFile} = require('fs/promises');
const {resolve} = require('path');
const {SingleBar} = require('cli-progress');
const {clothPaletteToJobMap, MALE, FEMALE} = require('./data/translations');
const {getPaletteRoot} = require('./util/validation');

//Configuration based on intended client/server support
//Note: Not 0-indexed
const MAX_CLOTH_COLOR = 700;
const defaultPalette = resolve(__dirname, 'data', 'default.pal');

//Init progressbar
const expectedFileCount = (MAX_CLOTH_COLOR + 1) * Object.keys(clothPaletteToJobMap).length * 2;
const progressBar = new SingleBar();

//Start program
(async () => await main())();

async function main() {
  // Validate paths and get root of palettes
  const paletteRoot = getPaletteRoot();

  //Check if every variation of paletteToJobMap key, sex, and index exists.
  const missingFiles = await checkAllFiles(paletteRoot);

  //Copy default palette to fill in missing files, if any
  if(missingFiles.length > 0) {
    await addMissingFiles(missingFiles);
  }

  console.info('Complete!');
}

async function checkAllFiles(paletteRoot) {
  console.info(`Scanning "${paletteRoot}"`);
  progressBar.start(expectedFileCount, 0);

  const filePromises = Object.entries(clothPaletteToJobMap)
    .flatMap(([paletteName, meta]) => {
      return [
        ...Array(MAX_CLOTH_COLOR + 1).keys()
      ]
        .flatMap(index => [
          checkFileExists(resolve(paletteRoot, `${paletteName}_${MALE}_${index}.pal`), meta),
          checkFileExists(resolve(paletteRoot, `${paletteName}_${FEMALE}_${index}.pal`), meta),
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
async function checkFileExists(paletteName, meta) {
  try {
    await access(paletteName, FS_CONSTANTS.R_OK);
  } catch(err) {
    //Simplify error to contain absolute path
    throw new Error(`${paletteName} (${meta.job}) (${paletteName.includes(`_${MALE}_`) ? 'Male' : 'Female'})`, {cause: {paletteName, meta}});
  } finally {
    progressBar.increment();
  }
}

async function addMissingFiles(missingFiles) {
  console.info(`Copying default palette from "${defaultPalette}" to replace missing files.`);

  //Wait for results and log
  progressBar.start(missingFiles.length, 0);
  const copyPromises = await Promise.allSettled(
    missingFiles.map(err => copyDefaultPalette(err.cause.paletteName))
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

async function copyDefaultPalette(target) {
  try {
    await copyFile(defaultPalette, target);
    return target;
  } catch(err) {
    //Simplify error to contain absolute path
    throw new Error(target);
  } finally {
    progressBar.increment();
  }
}

function sleep(durationInMs) {
  return new Promise(res => {
    setTimeout(res, durationInMs);
  });
}
