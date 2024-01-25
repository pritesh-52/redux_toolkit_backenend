const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: "my_user",
  database: "student",
  port: 5432,
  password: "root",
  host: "localhost",
});

module.exports = pool;
