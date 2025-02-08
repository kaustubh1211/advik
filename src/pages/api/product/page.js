import pool from "@/libs/db";

let cache = null; // Store cached products
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 1000; // Cache for 60 seconds

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const now = Date.now();
      if (cache && now - lastFetchTime < CACHE_DURATION) {
        return res.status(200).json(cache);
      }

      const [products] = await pool.query("SELECT * FROM products");

      // Cache response
      cache = products;
      lastFetchTime = now;

      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
