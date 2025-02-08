/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import CartProduct from "@/components/shared/cart/CartProduct";
import Nodata from "@/components/shared/no-data/Nodata";
import useSweetAlert from "@/hooks/useSweetAlert";
import addItemsToLocalstorage from "@/libs/addItemsToLocalstorage";
import countTotalPrice from "@/libs/countTotalPrice";
import modifyAmount from "@/libs/modifyAmount";
import { useCartContext } from "@/providers/CartContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const CartPrimary = () => {
  const { cartProducts: currentProducts, setCartProducts } = useCartContext();
  const { refetchCart } = useCartContext();
  const createAlert = useSweetAlert();
  const cartProducts = currentProducts;

  // states
  const [updateProducts, setUpdateProducts] = useState(cartProducts);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0); // Store discount percentage
  const [gst, setGst] = useState(0);
  const subTotalPrice = countTotalPrice(cartProducts);
  const gstTotal = (subTotalPrice * 18) / 100; // 18% GST Calculation
  const vat = 0;
  const discountedPrice = discount ? (subTotalPrice * discount) / 100 : 0;
  const totalPrice = modifyAmount(
    subTotalPrice - discountedPrice + vat + gstTotal
  );
  const isCartProduct = cartProducts?.length || false;

  const { data: session } = useSession();

  useEffect(() => {
    console.log("Session data:", session); // Debug session data
  }, [session]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchAppliedCoupon();
    }
  }, [session]);
  useEffect(() => {
    console.log("Cart Products:", cartProducts);
    setUpdateProducts([...cartProducts]);
    setIsClient(true);
  }, [cartProducts]);

  // Apply coupon code
  const fetchAppliedCoupon = async () => {
    try {
      const response = await axios.get(
        `/api/coupon/user?userId=${session.user.id}`
      );
      if (response.data.success) {
        setDiscount(response.data.coupon.discount);
      }
    } catch (error) {
      console.error("Error fetching coupon:", error);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      createAlert("error", "Please enter a coupon code.");
      return;
    }
  
    try {
      const response = await axios.post("/api/coupon/apply", {
        userId: session?.user?.id, // Ensure user is authenticated
        couponCode,
      });
  
      if (response.status === 200) {
        const { discount } = response.data;
        setDiscount(discount);
        createAlert("success", `Coupon applied! Discount: ${discount}%`);
      } else {
        throw new Error("Invalid coupon");
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
  
      // Check if the error response exists and has a message
      const errorMessage =
        error.response?.data?.message || "Invalid or expired coupon.";
  
      createAlert("error", errorMessage);
      setDiscount(0); // Reset discount if coupon is invalid
    }
  };

  // Update cart items
  const handleUpdateCart = async () => {
    if (!session?.user?.id) {
      console.log("User not found, can't update");
      return;
    }

    try {
      for (const product of updateProducts) {
        const { product_id, quantity } = product;

        console.log("Updating product:", { product_id, quantity });

        const response = await axios.post("/api/update/page", {
          userId: session.user.id,
          product_id,
          quantity,
        });

        if (response.status !== 200) {
          throw new Error(`Failed to update product ID ${product_id}`);
        }
      }

      createAlert("success", "Cart updated successfully!");
      setCartProducts(updateProducts);
      setIsUpdate(false);
    } catch (error) {
      console.error("Error updating cart:", error);
      createAlert("error", "Failed to update cart.");
    }
  };

  return (
    <div className="liton__shoping-cart-area mb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="shoping-cart-inner">
              <div className="shoping-cart-table table-responsive">
                {isClient ? (
                  <table className="table">
                    <tbody>
                      {!isCartProduct ? (
                        <tr>
                          <td>
                            <Nodata text={"Empty Cart!"} />
                          </td>
                        </tr>
                      ) : (
                        cartProducts?.map((product, idx) => (
                          <CartProduct
                            key={idx}
                            product={product}
                            updateProducts={updateProducts}
                            setUpdateProducts={setUpdateProducts}
                            setIsUpdate={setIsUpdate}
                          />
                        ))
                      )}

                      {/* Coupon Row */}
                      <tr className="cart-coupon-row">
                        <td colSpan="6">
                          <div className="cart-coupon">
                            <input
                              type="text"
                              name="cart-coupon"
                              placeholder="Coupon code"
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value)}
                            />
                            <button
                              type="button"
                              onClick={handleApplyCoupon}
                              className="btn theme-btn-2 btn-effect-2"
                            >
                              Apply Coupon
                            </button>
                          </div>
                        </td>
                        <td>
                          <button
                            onClick={handleUpdateCart}
                            type="submit"
                            className={`btn theme-btn-2 ${
                              isUpdate ? "" : "disabled"
                            }`}
                            disabled={!isUpdate}
                          >
                            Update Cart
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  ""
                )}
              </div>
              <div className="shoping-cart-total mt-50">
                <h4>Cart Totals</h4>
                {isClient ? (
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>Cart Subtotal</td>
                        <td>₹{modifyAmount(subTotalPrice)}</td>
                      </tr>
                      {discount > 0 && (
                        <tr>
                          <td>Coupon Discount ({discount}%)</td>
                          <td>-₹{modifyAmount(discountedPrice)}</td>
                        </tr>
                      )}
                      <tr>
                        <td>Shipping and Handling</td>
                        <td>₹{modifyAmount(vat)}</td>
                      </tr>
                      <tr>
                        <td>GST (18%)</td>
                        <td>₹{modifyAmount(gstTotal)}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Order Total</strong>
                        </td>
                        <td>
                          <strong>₹{totalPrice}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  ""
                )}
                <div className="btn-wrapper text-right">
                  <Link
                    href="/checkout"
                    className="theme-btn-1 btn btn-effect-1"
                    style={{
                      opacity: isCartProduct ? 1 : 0.5,
                      pointerEvents: isCartProduct ? "auto" : "none",
                    }}
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPrimary;
