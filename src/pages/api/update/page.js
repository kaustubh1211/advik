// pages/api/cart/update.js
import pool from "@/libs/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { userId, product_id, quantity } = req.body;

  if (!userId || !product_id || quantity < 0) {
    return res.status(400).json({ success: false, message: "Invalid input data" });
  }

  try {
    const connection = await pool.getConnection();

    // Ensure product exists in cart
    const [existingProduct] = await connection.query(
      "SELECT * FROM cart WHERE user_id = ? AND product_id = ?",
      [userId, product_id]
    );

    if (existingProduct.length > 0) {
      // Update quantity if product exists
      await connection.query(
        "UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?",
        [quantity, userId, product_id]
      );
    } else {
      // Handle if product does not exist (optional)
      return res.status(404).json({ success: false, message: "Product not found in cart" });
    }

    connection.release();
    res.status(200).json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
