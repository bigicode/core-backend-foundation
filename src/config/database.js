const mysql = require('mysql2');
const config = require('./index');



const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.name,
  connectionLimit: 10,
});

module.exports = pool.promise();