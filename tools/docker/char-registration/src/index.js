const https = require('https');
const express = require('express');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const { initializeConnectionPool } = require('./server/database');
const { EXPRESS_PORT, EXPRESS_CERT_PATH, EXPRESS_CERT_PRIV_KEY_PATH } = require('./env');


//Create and configure server
console.log('Creating and configuring server...');
const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', 'src/views');

//Prepare SSL
const cert = readFileSync(resolve(EXPRESS_CERT_PATH));
const privateKey = readFileSync(resolve(EXPRESS_CERT_PRIV_KEY_PATH));

//Routing
console.log('Registering route handlers...');
require('./server/routes.js')(app);

//Database connections
console.log('Initializing database connection pool...');
initializeConnectionPool();
console.log('Connection pool initialized');

//Start server
https.createServer({
  key: privateKey,
  cert,
}, app)
  .listen(EXPRESS_PORT, () => {
    console.log(`Server listening on port: ${EXPRESS_PORT}`);
  });
