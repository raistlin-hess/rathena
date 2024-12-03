const {resolve} = require('path');

//Define all env variables here
const ENV = {
  EXPRESS_PORT: Number(process.env.EXPRESS_PORT) || 443,
  EXPRESS_CERT_PATH: process.env.EXPRESS_CERT_PATH ?? 'cert.pem',
  EXPRESS_CERT_PRIV_KEY_PATH: process.env.EXPRESS_CERT_PRIV_KEY_PATH ?? 'privkey.pem',
  EXPRESS_SKIP_HTTPS: getBooleanFromEnv(process.env.EXPRESS_SKIP_HTTPS),
  DB_HOST: process.env.DB_HOST ?? 'localhost',
  DB_USER: process.env.DB_USER ?? 'ragnarok',
  DB_PASSWORD: process.env.DB_PASSWORD ?? 'ragnarok',
  DB_DATABASE_NAME: process.env.DB_DATABASE_NAME ?? 'ragnarok',
  DB_ENABLE_DEBUG: getBooleanFromEnv(process.env.DB_ENABLE_DEBUG),
  USE_MD5_PASSWORD: getBooleanFromEnv(process.env.USE_MD5_PASSWORD),
  CLIENT_DOWNLOAD_LOCAL_PATH: filepathFromCwd(process.env.CLIENT_DOWNLOAD_LOCAL_PATH ?? 'src/assets/client.rar'),
  LITE_CLIENT_DOWNLOAD_LOCAL_PATH: filepathFromCwd(process.env.LITE_CLIENT_DOWNLOAD_LOCAL_PATH ?? 'src/assets/liteClient.zip'),
  PATCH_FILES_LOCAL_PATH: filepathFromCwd(process.env.PATCH_FILES_LOCAL_PATH ?? 'src/assets/patch-files'),
};

module.exports = ENV;

function getBooleanFromEnv(envVar, defaultValue = 'false') {
  return (envVar?.toLowerCase() ?? defaultValue) == 'true';
}

function filepathFromCwd(filepath) {
  return resolve(process.cwd(), filepath);
}
