import mysql from "mysql2"
import "./env.js"

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port:process.env.DB_PORT,
  user: process.env.DB_USER,
  password:process.env.PASSWORD,
  name: process.env.DB_NAME
})

export default db;
