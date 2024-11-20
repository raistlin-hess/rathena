//Define all env variables here
const ENV = {
  EXPRESS_PORT: Number(process.env.EXPRESS_PORT) || 443,
  EXPRESS_CERT_PATH: process.env.EXPRESS_CERT_PATH ?? 'cert.pem',
  EXPRESS_CERT_PRIV_KEY_PATH: process.env.EXPRESS_CERT_PRIV_KEY_PATH ?? 'privkey.pem',
  DB_HOST: process.env.DB_HOST ?? 'localhost',
  DB_USER: process.env.DB_USER ?? 'ragnarok',
  DB_PASSWORD: process.env.DB_PASSWORD ?? 'ragnarok',
  DB_DATABASE_NAME: process.env.DB_DATABASE_NAME ?? 'ragnarok',
};

module.exports = ENV;
