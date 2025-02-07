import fs from "fs";
import path from "path";
import pool from "@/libs/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const [products] = await pool.query("SELECT * FROM products");
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
