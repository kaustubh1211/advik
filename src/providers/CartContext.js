"use client";
import useSweetAlert from "@/hooks/useSweetAlert";
import addItemsToLocalstorage from "@/libs/addItemsToLocalstorage";
import getItemsFromLocalstorage from "@/libs/getItemsFromLocalstorage";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { signIn, useSession, signOut } from "next-auth/react";
import { debounce } from "lodash";
import { redirect, useRouter } from "next/navigation";

const cartContext = createContext(null);

const CartContextProvider = ({ children }) => {
  const [cartStatus, setCartStatus] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const creteAlert = useSweetAlert();
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    console.log("Session data:", session); // Debug session data
  }, [session]);

  // Fetch cart from backend if logged in
  const [loading, setLoading] = useState(false);

  const fetchCartFromBackend = debounce(async () => {
    if (session?.user?.id) {
      try {
        const { data } = await axios.get(
          `/api/FetchCard/page?userId=${session.user.id}`
        );
        setCartProducts(data.cart || []);
        addItemsToLocalstorage("cart", data.cart || []);
      } catch (error) {
        console.error("Error fetching cart from backend:", error);
      }
    }
  }, 500); // 500ms debounce delay

  useEffect(() => {
    if (session) fetchCartFromBackend();
  }, [session]);

  const refetchCart = async () => {
    if (session) {
      try {
        const { data } = await axios.get(
          `/api/FetchCard/page?userId=${session.user.id}`
        );
        setCartProducts(data.cart || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }
  };

  // Sync cart with backend
  const syncCartWithBackend = async (cart) => {
    if (!cart || !Array.isArray(cart)) {
      console.error("Invalid cart data during sync:", cart);
      return;
    }

    const formattedCart = cart
      .map(({ id, quantity, title, price }) => {
        if (!id) {
          console.error("Invalid cart item (missing ID):", {
            id,
            quantity,
            title,
            price,
          });
          return null;
        }
        return {
          product_id: id, // Map frontend's `id` to backend's `product_id`
          quantity,
          title,
          price,
        };
      })
      .filter((item) => item !== null); // Remove invalid items

    try {
      console.log("Syncing cart with backend:", {
        userId: session?.user?.id,
        cart: formattedCart,
      });

      const response = await axios.post("/api/synch/page", {
        userId: session?.user?.id,
        cart: formattedCart,
      });

      console.log("Cart synced successfully:", response.data);
    } catch (error) {
      if (error.response?.status === 400) {
        console.error("Validation error:", error.response.data);
      } else {
        console.error("Server error:", error.message);
      }
    }
  };

  // Add product to cart
  const addProductToCart = async (currentProduct, isDecreament) => {
    const { id: product_id, title, quantity } = currentProduct;

    if (!session?.user?.id) {
      window.location.href = `/login`;

      return;
    }
    if (!product_id) {
      console.error("Product is missing an id:", currentProduct);
      return;
    }

    const existingProduct = cartProducts.find((p) => p.id === product_id);
    const newQuantity = isDecreament
      ? Math.max((existingProduct?.quantity || 1) - 1, 0)
      : (existingProduct?.quantity || 0) + 1;

    // If quantity is 0, remove the product instead of updating
    if (newQuantity === 0) {
      return deleteProductFromCart(product_id, title);
    }

    try {
      const { data } = await axios.post("/api/AddToCard/page", {
        userId: session?.user?.id,
        product_id,
        quantity: isDecreament ? -1 : 1, // Increment or decrement
      });

      console.log("Cart update success:", data);
      refetchCart();

      // Update local state and storage
      const updatedCart = cartProducts.map((product) =>
        product.id === product_id
          ? { ...product, quantity: newQuantity }
          : product
      );
      console.log("add to card" + updatedCart);
      setCartProducts(updatedCart);
      addItemsToLocalstorage("cart", updatedCart);
      setCartStatus(isDecreament ? "decreased" : "increased");
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const deleteProductFromCart = async (currentId, currentTitle) => {
    if (!currentId) {
      console.error("❌ Product ID is missing. Cannot delete from cart.");
      return; // Stop execution if product ID is undefined
    }

    if (!session || !session.user) {
      console.error("❌ User is not logged in. Cannot delete from backend.");
      return;
    }

    console.log("✅ Deleting product from cart:", { currentId, currentTitle });

    // Remove from local state
    const updatedCart = cartProducts.filter(({ id }) => id !== currentId);
    setCartProducts(updatedCart);
    addItemsToLocalstorage("cart", updatedCart);

    // Show success alert
    creteAlert("success", `${currentTitle} removed from cart.`);

    try {
      // Delete from backend
      const response = await axios.delete("/api/DeleteToCard/page", {
        data: { userId: session.user.id, productId: currentId },
      });

      if (response.data.success) {
        console.log("✅ Product removed from cart:", response.data.message);
        refetchCart();
      } else {
        console.error("❌ Failed to remove product:", response.data.message);
      }
    } catch (error) {
      console.error("❌ Error removing from cart:", error);
    }
  };

  return (
    <cartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProductToCart,
        deleteProductFromCart,
        cartStatus,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export const useCartContext = () => {
  const value = useContext(cartContext);
  return value;
};

export default CartContextProvider;
