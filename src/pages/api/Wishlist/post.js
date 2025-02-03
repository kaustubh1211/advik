// pages/api/wishlist/add.js
import pool from "@/libs/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ success: false, message: "User ID and Product ID are required" });
  }

  try {
    const connection = await pool.getConnection();

    // Check if product already exists in wishlist
    const [existingProduct] = await connection.query(
      "SELECT * FROM wishlist WHERE user_id = ? AND product_id = ?",
      [userId, productId]
    );

    if (existingProduct.length > 0) {
      return res.status(400).json({ success: false, message: "Product already exists in wishlist" });
    }

    // Insert new product to wishlist
    await connection.query(
      "INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)",
      [userId, productId]
    );

    connection.release();
    return res.status(200).json({ success: true, message: "Product added to wishlist successfully" });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
