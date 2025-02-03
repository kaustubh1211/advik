import pool from "@/libs/db"; // Database connection

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, productId, quantity } = req.body;

    try {
      // Check if the product is already in the cart for this user
      const [existingItem] = await pool.query(
        "SELECT * FROM cart WHERE user_id = ? AND product_id = ?",
        [userId, productId]
      );

      if (existingItem.length > 0) {
        // Update quantity if the product is already in the cart
        await pool.query(
          "UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?",
          [quantity, userId, productId]
        );
      } else {
        // Insert new product into the cart
        await pool.query(
          "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
          [userId, productId, quantity]
        );
      }

      res.status(200).json({ success: true, message: "Product added to cart." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to add product to cart." });
    }
  }
 else  if(req.method==="GET"){
  
  const { userId } = req.query;
  try {
    // Retrieve all cart items for the given user
    const [cartItems] = await pool.query(
      `SELECT c.product_id, c.quantity, p.title, p.price, p.image 
       FROM cart c 
       JOIN products p ON c.product_id = p.id 
       WHERE c.user_id = ?`,
      [userId]
    );

    res.status(200).json({ success: true, cart: cartItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch cart items." });
  }
 

  }
  else if (req.method === "DELETE") {
    const { userId, productId } = req.body;

    try {
      // Delete a specific product from the cart
      await pool.query("DELETE FROM cart WHERE user_id = ? AND product_id = ?", [
        userId,
        productId,
      ]);

      res.status(200).json({ success: true, message: "Product removed from cart." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to remove product from cart." });
    }
  } 
  else {
    res.status(405).json({ success: false, message: "Method not allowed." });
  }
}
