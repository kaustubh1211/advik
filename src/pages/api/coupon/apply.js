import pool from "@/libs/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { userId, couponCode } = req.body;
  if (!userId || !couponCode) {
    return res.status(400).json({ success: true, message: "User ID and coupon code are required" });
  }

  try {
    // Check if coupon exists and is valid
    const [coupon] = await pool.query("SELECT * FROM coupons WHERE code = ? AND (expires_at IS NULL OR expires_at > NOW())", [couponCode]);

    if (coupon.length === 0) {
      return res.status(400).json({ success: true, message: "Invalid or expired coupon" });
    }

    const couponData = coupon[0];

    // Check if the user has already used this coupon
    // const [existing] = await pool.query("SELECT * FROM user_coupons WHERE user_id = ? AND coupon_id = ?", [userId, couponData.id]);

    // if (existing.length > 0) {
    //   return res.status(400).json({ success: false, message: "Coupon already applied by this user" });
    // }

    // Apply the coupon
    await pool.query("INSERT INTO user_coupons (user_id, coupon_id) VALUES (?, ?)", [userId, couponData.id]);

    // Increment coupon usage
    await pool.query("UPDATE coupons SET times_used = times_used + 1 WHERE id = ?", [couponData.id]);

    res.status(200).json({ success: true, message: "Coupon applied successfully", discount: couponData.discount });
  } catch (error) {
    console.error("Error applying coupon:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
