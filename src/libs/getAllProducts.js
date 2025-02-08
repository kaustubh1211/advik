let cachedProducts = null;
let lastFetchTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

const getAllProducts = async () => {
  const now = Date.now();
  
  // Return cached data if valid
  if (cachedProducts && lastFetchTime && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedProducts;
  }

  try {
    const res = await fetch("api/product/page", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch products");
    
    cachedProducts = await res.json();
    lastFetchTime = now;
    return cachedProducts;
    
  } catch (error) {
    console.error("Error fetching products:", error);
    return cachedProducts || []; // Return cached data on error if available
  }
};

export default getAllProducts;