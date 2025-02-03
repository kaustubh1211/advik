// pages/api/cart/add.js
import pool from "@/libs/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { userId, product_id, quantity } = req.body;

  if (!userId || !product_id || quantity <= 0) {
    return res.status(400).json({ success: false, message: "Invalid input data" });
  }

  try {
    const connection = await pool.getConnection();

    // Check if product already exists in cart
    const [existingProduct] = await connection.query(
      "SELECT * FROM cart WHERE user_id = ? AND product_id = ?",
      [userId, product_id]
    );

    if (existingProduct.length > 0) {
      // Update quantity
      await connection.query(
        "UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?",
        [quantity, userId, product_id]
      );
    } else {
      // Insert new item
      await connection.query(
        "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
        [userId, product_id, quantity]
      );
    }

    connection.release();
    res.status(200).json({ success: true, message: "Product added to cart successfully" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
