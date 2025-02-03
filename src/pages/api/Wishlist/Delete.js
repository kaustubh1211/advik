// pages/api/wishlist/delete.js
import pool from "@/libs/db";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { userId, productId } = req.query;

  if (!userId || !productId) {
    return res.status(400).json({ success: false, message: "User ID and Product ID are required" });
  }

  try {
    const connection = await pool.getConnection();

    // Check if product exists in wishlist
    const [existingProduct] = await connection.query(
      "SELECT * FROM wishlist WHERE user_id = ? AND product_id = ?",
      [userId, productId]
    );

    if (existingProduct.length === 0) {
      return res.status(404).json({ success: false, message: "Product not found in wishlist" });
    }

    // Delete product from wishlist
    await connection.query(
      "DELETE FROM wishlist WHERE user_id = ? AND product_id = ?",
      [userId, productId]
    );

    connection.release();
    return res.status(200).json({ success: true, message: "Product removed from wishlist" });
  } catch (error) {
    console.error("Error deleting from wishlist:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
