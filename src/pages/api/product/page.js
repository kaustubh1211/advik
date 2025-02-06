import fs from "fs";
import path from "path";
import pool from "@/libs/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const filePath = path.join(process.cwd(), "public/fakedata/newProducts.json");

      // Check if the file already exists
      if (!fs.existsSync(filePath)) {
        console.log("File does not exist, creating...");

        // Fetch data from the database
        const [rows] = await pool.query("SELECT * FROM products");
 
        // Save data to the file
        fs.mkdirSync(path.dirname(filePath), { recursive: true }); // Ensure the directory exists
        fs.writeFileSync(filePath, JSON.stringify(rows, null, 2));
      } else {
        console.log("File already exists.");
      }

      // Respond with success
      res.status(200).json({ success: true, message: "File is ready." });
    } catch (error) {
      console.error("Error handling the request:", error);
      res.status(500).json({ success: false, message: "Failed to handle request." });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
