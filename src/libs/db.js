import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",  
  user: "root",
  password: "password", 
  database: "advik", 
  waitForConnections: true, // Important: Wait if no connection is available
  connectionLimit: 10,      // Set the max connections allowed
  queueLimit: 0             // 0 means unlimited queued requests
});

export default pool;
