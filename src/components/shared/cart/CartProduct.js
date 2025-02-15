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
  const {
    product_id = product.id, 
    title,
    price,
    quantity: quantity1,
    image,
    disc,
    color,
  } = product;

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
      setTimeout(() => {
        const increament = inputParent.querySelector(".inc");
        const decreament = inputParent.querySelector(".dec");

        // increament.addEventListener("click", () => {
        //   setQuantity(parseInt(input.value));
        //   setIsUpdate(true);
        // });
        // decreament.addEventListener("click", () => {
        //   setQuantity(parseInt(input.value));
        //   setIsUpdate(true);
        // });
      }, 500);
    }
  }, [isWishlist]);

  // Handle updates to the product list when quantity changes
  useEffect(() => {
    if (!isWishlist) {
      setUpdateProducts((prevProducts) => {
        const updatedProducts = prevProducts.map((prod) =>
          prod.product_id === product_id ? { ...prod, quantity } : prod
        );

        return updatedProducts;
      });
    }
  }, [isWishlist, quantity]);


  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    setIsUpdate(true);
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
    setIsUpdate(true);
  };

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
        {/* <Link href={" "}> */}
          <Image src={image} alt={title} height={1000} width={1000} />
        {/* </Link> */}
      </td>
      <td className="cart-product-info">
        <h4>
          {/* <Link href={""}> */}
          {sliceText(title, 30)}
          {/* </Link> */}
        </h4>
      </td>
      <td className="cart-product-price">₹{netPriceModified}</td>
      {isWishlist ? (
        <td className="cart-product-stock">In Stock</td>
      ) : (
        <td className="cart-product-quantity">
          <div className="cart-plus-minus" ref={inputRef}>
          <button onClick={handleDecrease}  className="dec qtybutton">-</button>
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
            
            <button  onClick={handleIncrease} className="inc qtybutton">+</button>
          </div>
        </td>
      )}

      {isWishlist ? (
        <td
          className="cart-product-add-cart"
          onClick={() => {
            addProductToCart({
              ...product,
              quantity,
            });
          }}
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
