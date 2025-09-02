// lib/db.js
import mysql from "mysql2/promise";

let pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: "localhost",
      user: "root", // change if needed
      password: "S@k182820", // change if needed
      database: "school_directory",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}
