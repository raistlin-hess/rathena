const {main: customClientMain} = require('./util/customClient');
const {main: gravityMain} = require('./util/gravity');

//Start program
(async () => await main())();

async function main() {
  //Gather all unique job palettes from Gravity excluding sex, cloth index, and extension
  const uniqueGravityFiles = await gravityMain();
  await customClientMain(uniqueGravityFiles);
}
