"use client";
import useSweetAlert from "@/hooks/useSweetAlert";
import addItemsToLocalstorage from "@/libs/addItemsToLocalstorage";
import getItemsFromLocalstorage from "@/libs/getItemsFromLocalstorage";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { signIn, useSession, signOut } from "next-auth/react";

const cartContext = createContext(null);

const CartContextProvider = ({ children }) => {
  const [cartStatus, setCartStatus] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const creteAlert = useSweetAlert();

  const { data: session } = useSession();
  useEffect(() => {
    console.log("Session data:", session); // Debug session data
  }, [session]);

  // Fetch cart from backend if logged in
  useEffect(() => {
    const fetchCartFromBackend = async () => {
      if (session) {
        try {
          const { data } = await axios.get(`/api/AddCard/page?userId=${session.user.id}`);
          setCartProducts(data.cart || []);
          addItemsToLocalstorage("cart", data.cart || []); // Sync local storage
        } catch (error) {
          console.error("Error fetching cart from backend:", error);
        }
      } else {
        const cartProductFromLocalStorage = getItemsFromLocalstorage("cart");
        if (cartProductFromLocalStorage) {
          setCartProducts(cartProductFromLocalStorage);
        }
      }
    };

    fetchCartFromBackend();
  }, [session]);

  // Sync cart with backend
  const syncCartWithBackend = async (cart) => {
    if (!cart || !Array.isArray(cart)) {
      console.error("Invalid cart data during sync:", cart);
      return;
    }
  
    const formattedCart = cart.map(({ id, quantity, title, price }) => {
      if (!id) {
        console.error("Invalid cart item (missing ID):", { id, quantity, title, price });
        return null;
      }
      return {
        product_id: id, // Map frontend's `id` to backend's `product_id`
        quantity,
        title,
        price,
      };
    }).filter(item => item !== null); // Remove invalid items
  
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
  const addProductToCart = (currentProduct, isDecreament, isTotalQuantity) => {
    const { id: currentId, title: currentTitle } = currentProduct;
    if (!currentProduct.id) {
      console.error("Product is missing an id:", currentProduct);
      return; // Skip invalid products
    }  
    const modifyableProduct = cartProducts?.find(
      ({ id, title }) => id === currentId && title === currentTitle
    );

    const previousQuantity = modifyableProduct?.quantity || 0;
    const currentQuantity = currentProduct?.quantity;

    let currentProducts;

    if (isTotalQuantity) {
      currentProducts = cartProducts?.map((product) =>
        product.id === currentId && product.title === currentTitle
          ? { ...product, quantity: currentProduct.quantity }
          : product
      );
      setCartStatus(previousQuantity < currentQuantity ? "increased" : "decreased");
    } else {
      const isAlreadyExist = !!modifyableProduct;

      if (isAlreadyExist) {
        currentProducts = cartProducts?.map((product) =>
          product.id === currentId && product.title === currentTitle
            ? { ...product, quantity: product.quantity + (isDecreament ? -currentQuantity : currentQuantity) }
            : product
        );
        setCartStatus(isDecreament ? "decreased" : "increased");
      } else {
        currentProducts = [...cartProducts, currentProduct];
        setCartStatus("added");
      }
    }

    setCartProducts(currentProducts);
    addItemsToLocalstorage("cart", currentProducts);

    // Sync with backend
    syncCartWithBackend(currentProducts);
  };

  const deleteProductFromCart = (currentId, currentTitle) => {
    // Validate currentId
    // if (!currentId) {
    //   console.error("Invalid currentId during deletion:", { currentId, currentTitle });
    //   return;
    // }
  
    console.log("Deleting product from cart:", { currentId, currentTitle });
  
    // Filter out the product to delete
    const updatedCart = cartProducts.filter(({ id }) => id !== currentId);
  
    // Update state and local storage
    setCartProducts(updatedCart);
    addItemsToLocalstorage("cart", updatedCart);
  
    // Show success alert
    creteAlert("success", `${currentTitle} removed from cart.`);
  
    // Sync with backend only if the cart is not empty
    if (updatedCart.length > 0) {
      setTimeout(() => {
        syncCartWithBackend(updatedCart);
      }, 0);
    } else {
      console.log("Cart is now empty. Syncing empty cart with backend.");
      setTimeout(() => {
        syncCartWithBackend([]); // Explicitly sync an empty cart
      }, 0);
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
