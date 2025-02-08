
import pool from "@/libs/db";

export default async function handler(req, res) {
    if (req.method !== "GET") {
      return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }
  
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }
  
    try {
      const [coupon] = await pool.query(
        `SELECT c.code, c.discount 
         FROM coupons c
         JOIN user_coupons uc ON c.id = uc.coupon_id
         WHERE uc.user_id = ?`,
        [userId]
      );
  
      if (coupon.length === 0) {
        return res.status(200).json({ success: false, message: "No applied coupon", discount: 0 });
      }
  
      res.status(200).json({ success: true, coupon: coupon[0] });
    } catch (error) {
      console.error("Error fetching applied coupon:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
  