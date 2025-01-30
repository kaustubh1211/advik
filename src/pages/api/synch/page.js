import pool from "@/libs/db";

export default async function handler(req, res) {
  const { userId, cart } = req.body;

  console.log("📥 Incoming request:", JSON.stringify(req.body, null, 2));

  // Validate input
  if (!userId || !Array.isArray(cart)) {
    console.error("❌ Invalid input data:", { userId, cart });
    return res.status(400).json({ success: false, message: "Invalid input data" });
  }

  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    if (cart.length === 0) {
      console.log("🛒 Cart is empty. Clearing user's cart.");
      await connection.query("DELETE FROM cart WHERE user_id = ?", [userId]);
      await connection.commit();
      connection.release();
      return res.status(200).json({ success: true, message: "Cart cleared successfully" });
    }

    // 🔎 Debugging: Log cart items before filtering
    console.log("🔍 Received cart items:", cart);

    // Filter and validate cart items
    const validCart = cart.filter(
      (item) =>
        item.product_id &&
        item.quantity > 0 &&
        typeof item.title === "string" &&
        (typeof item.price === "string" || typeof item.price === "number") // ✅ Allow number price
    );

    console.log("✅ Valid cart items:", validCart);

    if (validCart.length === 0) {
      console.error("❌ No valid cart items:", { cart });
      await connection.rollback();
      connection.release();
      return res.status(400).json({ success: false, message: "No valid cart items to sync" });
    }

    // Clear user's existing cart
    await connection.query("DELETE FROM cart WHERE user_id = ?", [userId]);

    // Bulk insert new cart items
    const cartInsertValues = validCart.map(({ product_id, quantity }) => [
      userId,
      product_id,
      quantity,
    ]);

    await connection.query(
      "INSERT INTO cart (user_id, product_id, quantity) VALUES ?",
      [cartInsertValues]
    );

    await connection.commit();
    connection.release();
    console.log("✅ Cart synced successfully!");
    res.status(200).json({ success: true, message: "Cart synced successfully" });

  } catch (error) {
    console.error("❌ Error syncing cart:", error);
    res.status(500).json({ success: false, message: "Failed to sync cart" });
  }
}
  