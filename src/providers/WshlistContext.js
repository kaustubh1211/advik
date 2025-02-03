"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { signIn, useSession, signOut } from "next-auth/react";

const WishlistContext = createContext(null);

const WishlistProvider = ({ children }) => {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [wishlistStatus, setWishlistStatus] = useState(null);

  const { data: session } = useSession();
  useEffect(() => {
    console.log("Session data wish:", session); // Debug session data
  }, [session]);
  const userId = session?.user?.id;
  // Fetch Wishlist Data from API
  const fetchWishlist = async () => {
    try {
      // if (!userId) {
      //   console.error("Error: User ID is missing.");
      //   return;
      // }
  
      console.log("Fetching wishlist for userId:", userId);
  
      const { data } = await axios.get(`/api/Wishlist/page?userId=${userId}`);
  
      console.log("Wishlist response:", data);
    
      setWishlistProducts(data.wishlist || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };
  
  useEffect(() => {
    fetchWishlist();
  }, [session]);
  

  // Add Product to Wishlist
  const addProductToWishlist = async (currentProduct) => {
    try {
      const { id: productId } = currentProduct;
  
    
      if (!session?.user?.id) {
        window.location.href = `/login`;
  
        return;
      }
  
      const response = await axios.post("/api/Wishlist/page", {
        userId,
        productId,
      });
  
      const { success, message } = response.data;
  
      if (success) {
        setWishlistProducts((prev) => [...prev, currentProduct]);
        localStorage.setItem("wishlist", JSON.stringify([...wishlistProducts, currentProduct]));
        setWishlistStatus("added");
      } else {
        // Handle case where the product is already in the wishlist
        console.warn(message);
        setWishlistStatus("exist");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      setWishlistStatus("exist"); // Generic error state
    }
  };
  

  // Remove Product from Wishlist
  const deleteProductFromWishlist = async (productId) => {
    try {
      if (!userId) {
        console.error("User is not logged in.");
        return;
      }

      await axios.delete(`/api/Wishlist/page`, {
        data: { userId, productId }, // ✅ Correct way to send data in DELETE request
      });

      setWishlistProducts((prev) => prev.filter((item) => item.id !== productId));
      setWishlistStatus("deleted");
      fetchWishlist();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistProducts, addProductToWishlist, deleteProductFromWishlist,wishlistStatus }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => useContext(WishlistContext);
export default WishlistProvider;
