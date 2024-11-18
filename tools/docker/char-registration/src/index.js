const express = require('express');
const { initializeConnectionPool } = require('./server/database');
const { EXPRESS_PORT } = require('./env');


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


//Start server
app.listen(EXPRESS_PORT);
console.log(`Server listening on port: ${EXPRESS_PORT}`);
