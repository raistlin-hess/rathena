const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE_NAME } = require('../env');
const mariadb = require('mariadb');

module.exports = {
  initializeConnectionPool,
  doesUserExist,
  createUser,
};

let pool = null;

function initializeConnectionPool() {
  pool = mariadb.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE_NAME,
    connectionLimit: 2,
    trace: true,
    debug: true,
  });
}

async function doesUserExist(username) {
  const users = await runQuery('SELECT * FROM login WHERE userid = ? LIMIT 1;', [username]);
  return users.length > 0;
}

async function createUser(username, password) {
  const response = await runQuery('INSERT INTO login (userid, user_pass, sex, email, group_id, character_slots) VALUES (?, ?, "M", "a@a.com", 99, 12);', [username, password]);
  return response.affectedRows == 1;
}

async function runQuery(query, args = []) {
  const connection = await pool.getConnection();
  try {
    return await connection.query(query, args);
  } finally {
    connection.release();
  }
}
