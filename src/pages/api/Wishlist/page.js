import pool from "@/libs/db"; // Database connection

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, productId } = req.body;
     console.log("wishlist="+userId, productId);
    try {
      // Check if the product is already in the wishlist for this user
      const [existingItem] = await pool.query(
        "SELECT * FROM wishlist WHERE user_id = ? AND product_id = ?",
        [userId, productId]
      );

      if (existingItem.length > 0) {
        res.status(200).json({ success: false, message: "Product already in wishlist." });
      } else {
        // Insert new product into the wishlist
        await pool.query(
          "INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)",
          [userId, productId]
        );

        res.status(200).json({ success: true, message: "Product added to wishlist." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to add product to wishlist." });
    }
  } 
  else if (req.method === "GET") {
    const { userId } = req.query;
    try {
      // Retrieve all wishlist items for the given user
      const [wishlistItems] = await pool.query(
    `
      SELECT w.product_id AS id, p.title, p.price, p.image
      FROM wishlist w
      JOIN products p ON w.product_id = p.id
      WHERE w.user_id = ?
    `, [userId]); // Map product_id to id here
    
      res.status(200).json({ success: true, wishlist: wishlistItems });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to fetch wishlist items." });
    }
  } 
  else if (req.method === "DELETE") {
    const { userId, productId } = req.body;

    try {
      // Delete a specific product from the wishlist
      await pool.query("DELETE FROM wishlist WHERE user_id = ? AND product_id = ?", [
        userId,
        productId,
      ]);

      res.status(200).json({ success: true, message: "Product removed from wishlist." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to remove product from wishlist." });
    }
  } 
  else {
    res.status(405).json({ success: false, message: "Method not allowed." });
  }
}
