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
  const { refethCart } = useCartContext();
  const creteAlert = useSweetAlert();
  const cartProducts = currentProducts;
  // stats
  const [updateProducts, setUpdateProducts] = useState(cartProducts);

  const [isUpdate, setIsUpdate] = useState(false);
  const [isClient, setIsisClient] = useState(false);
  const subTotalPrice = countTotalPrice(cartProducts);
  const vat = subTotalPrice ? 15 : 0;
  const totalPrice = modifyAmount(subTotalPrice + vat);
  const isCartProduct = cartProducts?.length || false;

  const { data: session } = useSession();
  useEffect(() => {
    console.log("Session data:", session); // Debug session data
  }, [session]);

  useEffect(() => {
    console.log("Cart Products:", cartProducts);
    setUpdateProducts([...cartProducts]);
    setIsisClient(true);
  }, [cartProducts]);
  // update cart
  const handleUpdateCart = async () => {
    if (!session?.user?.id) {
      console.log("User not found, can't update");
      return;
    }

    try {
      for (const product of updateProducts) {
        const { product_id, quantity } = product;

        console.log("Preparing to update product:", { product_id, quantity });

        const response = await axios.post("/api/updateCart/page", {
          userId: session.user.id,
          product_id,
          quantity,
        });

        console.log("API Response:", response.data); // Log API response

        if (response.status !== 200) {
          throw new Error(`Failed to update product with ID ${product_id}`);
        }
      }

      creteAlert("success", "Success! Cart updated.");
      setCartProducts(updateProducts); 
      setIsUpdate(false);
    } catch (error) {
      console.error("Error updating cart:", error);
      creteAlert("error", "Failed to update cart.");
    }
  };
  
  useEffect(() => {
    const newSubTotal = countTotalPrice(cartProducts);
    const newVat = newSubTotal ? 15 : 0;
    const newTotalPrice = modifyAmount(newSubTotal + newVat);
  
  }, [cartProducts]);
    
  
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

                      <tr className="cart-coupon-row">
                        <td colSpan="6">
                          <div className="cart-coupon">
                            <input
                              type="text"
                              name="cart-coupon"
                              placeholder="Coupon code"
                            />{" "}
                            <button
                              type="submit"
                              className="btn theme-btn-2 btn-effect-2"
                            >
                              Apply Coupon
                            </button>
                          </div>
                        </td>
                        <td>
                          <button
                            onClick={handleUpdateCart }
                            type="submit"
                            className={`btn theme-btn-2  ${
                              isUpdate ? "" : "disabled"
                            }`}
                            disabled={isUpdate ? false : true}
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
                      <tr>
                        <td>Shipping and Handing</td>
                        <td>₹{modifyAmount(vat)}</td>
                      </tr>
                      <tr>
                        <td>GST</td>
                        <td>₹00.00</td>
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
                    disabled={isUpdate ? false : true}
                  >
                    Proceed to checkout
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
