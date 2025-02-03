"use client";

import countDiscount from "@/libs/countDiscount";
import countTotalPrice from "@/libs/countTotalPrice";
import modifyAmount from "@/libs/modifyAmount";
import sliceText from "@/libs/sliceText";
import { useCartContext } from "@/providers/CartContext";
import { useProductContext } from "@/providers/ProductContext";
import { useWishlistContext } from "@/providers/WshlistContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const CartProduct = ({
  product,
  setUpdateProducts,
  updateProducts,
  setIsUpdate,
  isWishlist,
}) => {
  const { product_id, title, price, quantity: quantity1, image, disc, color } = product;

  // dom reference
  const inputRef = useRef(null);
  // hooks
  const { deleteProductFromCart, addProductToCart } = useCartContext();
  const { deleteProductFromWishlist } = useWishlistContext();
  const [quantity, setQuantity] = useState(quantity1);
  const { setCurrentProduct } = useProductContext();
  // variables
  const { netPrice } = countDiscount(price, disc);
  const totalPrice = countTotalPrice([{ ...product, quantity }]);
  const netPriceModified = modifyAmount(netPrice);
  const totalPiceModified = modifyAmount(totalPrice);
  const isQuantity = quantity > 1;

  // Handle quantity updates with event listeners
  useEffect(() => {
    if (!isWishlist) {
      const inputParent = inputRef.current;
      const input = inputParent.querySelector("input");
      const increament = inputParent.querySelector(".inc");
      const decreament = inputParent.querySelector(".dec");

      const handleIncrement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
        setIsUpdate(true);
      };
      const handleDecrement = () => {
        setQuantity((prevQuantity) => prevQuantity - 1);
        setIsUpdate(true);
      };

      // increament.addEventListener("click", handleIncrement);
      // decreament.addEventListener("click", handleDecrement);

      return () => {
        // increament.removeEventListener("click", handleIncrement);
        // decreament.removeEventListener("click", handleDecrement);
      };
    }
  }, [isWishlist]);

  // Handle updates to the product list when quantity changes
  useEffect(() => {
    if (!isWishlist) {
      const updatedProducts = updateProducts.map((prod) =>
        prod.product_id === product_id ? { ...prod, quantity } : prod
      );
      setUpdateProducts(updatedProducts);
    }
  }, [isWishlist, quantity]);

  return (
    <tr onMouseEnter={() => setCurrentProduct(product)}>
      <td
        className="cart-product-remove"
        onClick={() => {
          console.log(`Removing product: ${product_id}, title: ${title}`);
          isWishlist
            ? deleteProductFromWishlist(product_id, title)
            : deleteProductFromCart(product_id, title);
        }}
      >
        x
      </td>
      <td className="cart-product-image">
        <Link href={`/products/${product_id}`}>
          <Image src={image} alt={title} height={1000} width={1000} />
        </Link>
      </td>
      <td className="cart-product-info">
        <h4>
          <Link href={`/products/${product_id}`}>{sliceText(title, 30)}</Link>
        </h4>
      </td>
      <td className="cart-product-price">₹{netPriceModified}</td>
      {isWishlist ? (
        <td className="cart-product-stock">In Stock</td>
      ) : (
        <td className="cart-product-quantity">
          <div className="cart-plus-minus" ref={inputRef}>
            <input
              value={quantity}
              type="number"
              name="qtybutton"
              className="cart-plus-minus-box"
              onChange={(e) => {
                setQuantity(
                  !parseInt(e.target.value) ? 1 : parseInt(e.target.value)
                );
                setIsUpdate(true);
              }}
            />
          </div>
        </td>
      )}

      {isWishlist ? (
        <td
          className="cart-product-add-cart"
          onClick={() =>{

            addProductToCart({
              ...product,
              quantity,
            })
          }
          }
        >
          <Link
            className="submit-button-1"
            href="#"
            title="Add to Cart"
            data-bs-toggle="modal"
            data-bs-target="#add_to_cart_modal"
          >
            Add to Cart
          </Link>
        </td>
      ) : (
        <td className="cart-product-subtotal">₹{totalPiceModified}</td>
      )}
    </tr>
  );
};

export default CartProduct;
