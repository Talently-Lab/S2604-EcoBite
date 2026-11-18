import "./env.js";

import fs from "node:fs";
import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  ssl: {
    ca: fs.readFileSync(process.env.DB_SSL_CA),
    rejectUnauthorized: true,
  },
});

export default db;