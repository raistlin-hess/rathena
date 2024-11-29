module.exports = {printUsage};

function printUsage(errMsg) {
  console.error(errMsg);
  console.info(`Usage: node index.js <gravity-data-dir> <your-client-data-dir>`);
  process.exit(1);
}
