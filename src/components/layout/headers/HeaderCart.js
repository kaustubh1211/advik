"use client";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import ButtonSecondary from "@/components/shared/buttons/ButtonSecondary";
import Nodata from "@/components/shared/no-data/Nodata";
import countDiscount from "@/libs/countDiscount";
import countTotalPrice from "@/libs/countTotalPrice";
import modifyAmount from "@/libs/modifyAmount";

import { useCartContext } from "@/providers/CartContext";
import Image from "next/image";
import Link from "next/link";

const HeaderCart = () => {
  const { cartProducts, deleteProductFromCart } = useCartContext();
  const totalProduct = cartProducts?.length;
  const totalPrice = countTotalPrice(cartProducts);
  return (
    <div
      id="ltn__utilize-cart-menu"
      className="ltn__utilize ltn__utilize-cart-menu"
    >
      <div className="ltn__utilize-menu-inner ltn__scrollbar">
        <div className="ltn__utilize-menu-head">
          <span className="ltn__utilize-menu-title">Cart</span>
          <button className="ltn__utilize-close">×</button>
        </div>
        <div className="mini-cart-product-area ltn__scrollbar">
          {!totalProduct ? (
            <Nodata text={"Empty Cart!"} />
          ) : (
            cartProducts?.map(
              ({ product_id , title, image, price, quantity, disc }, idx) => {
                const { netPrice } = countDiscount(price, disc);
                // console.log("🛒 Cart Products:", cartProducts);
                return (
                  <div key={idx} className="mini-cart-item clearfix">
                    <div className="mini-cart-img">
                      <Link href={`/products/${product_id}`}>
                        <Image
                          src={image}
                          alt="Image"
                          width={1000}
                          height={1000}
                        />
                      </Link>
                      <span
                        onClick={() => {
                          console.log(
                            `🆔 Clicked Item: id=${product_id}, title=${title}`
                          );
                          deleteProductFromCart(product_id, title);
                        }}
                        className="mini-cart-item-delete"
                      >
                        <i className="icon-cancel"></i>
                      </span>
                    </div>
                    <div className="mini-cart-info">
                      <h6>
                        <Link href={`/products/${product_id}`}>
                          {" "}
                          {title?.length > 22 ? title?.slice(0, 22) : title}
                        </Link>
                      </h6>
                      <span className="mini-cart-quantity">
                        {quantity} x ₹{modifyAmount(netPrice)}
                      </span>
                    </div>
                  </div>
                );
              }
            )
          )}
        </div>
        <div className="mini-cart-footer">
          <div className="mini-cart-sub-total">
            <h5>
              Subtotal: <span>₹{totalPrice.toFixed(2)}</span>
            </h5>
          </div>
          <div className="btn-wrapper">
            <ButtonPrimary text={"View Cart"} path={"/cart"} />
            <ButtonSecondary text={"Checkout"} path={"/checkout"} />
          </div>
          <p>Free Shipping on All Orders Over ₹800!</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderCart;
