const https = require('https');
const express = require('express');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const { initializeConnectionPool } = require('./server/database');
const { EXPRESS_PORT, EXPRESS_CERT_PATH, EXPRESS_CERT_PRIV_KEY_PATH, EXPRESS_SKIP_HTTPS ,CLIENT_DOWNLOAD_LOCAL_PATH} = require('./env');


//Create and configure server
console.log('Creating and configuring server...');
const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', 'src/views');

//Routing
console.log('Registering route handlers...');
require('./server/routes.js')(app);

//Database connections
console.log('Initializing database connection pool...');
initializeConnectionPool();
console.log('Connection pool initialized');

if(EXPRESS_SKIP_HTTPS) {
  app.listen(EXPRESS_PORT);
  console.log(`Serving HTTP traffic on port: ${EXPRESS_PORT}`);
} else {
  //Prepare SSL
  const cert = readFileSync(resolve(EXPRESS_CERT_PATH));
  const privateKey = readFileSync(resolve(EXPRESS_CERT_PRIV_KEY_PATH));

  //Start server
  https.createServer({
    key: privateKey,
    cert,
  }, app)
    .listen(EXPRESS_PORT, () => {
      console.log(`Serving HTTPS traffic on port: ${EXPRESS_PORT}`);
    });
}
