// pages/api/cart/delete.js
import pool from "@/libs/db";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ success: false, message: "Missing userId or productId" });
  }

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "DELETE FROM cart WHERE user_id = ? AND product_id = ?",
      [userId, productId]
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Product not found in cart" });
    }

    res.status(200).json({ success: true, message: "Product removed from cart" });
  } catch (error) {
    console.error("Error deleting product from cart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
