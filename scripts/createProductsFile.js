

const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise"); // Or the database library you're using

// Database connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "advik",
});

(async () => {
  try {
    console.log("Fetching products from the database...");
    const [rows] = await pool.query("SELECT * FROM products");

    const filePath = path.join(process.cwd(), "public/fakedata/newProducts.json");

    // Ensure the directory exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Write data to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(rows, null, 2));
    console.log(`Products file created at: ${filePath}`);
    process.exit(0); // Exit the script
  } catch (error) {
    console.error("Error creating products file:", error);
    process.exit(1); // Exit with error
  }
})();
