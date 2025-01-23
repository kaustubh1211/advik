import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",  
  user: "root",
  password: "password", 
  database: "advik", 
});

export default pool;
