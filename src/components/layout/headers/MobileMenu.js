"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useWishlistContext } from "@/providers/WshlistContext";
import { useCartContext } from "@/providers/CartContext";
import countDataLength from "@/libs/countDataLength";

const MobileMenu = () => {
  const { wishlistProducts } = useWishlistContext();
  const { cartProducts } = useCartContext();
  const totalCartProduct = countDataLength(cartProducts);
  const totalWishlistProduct = countDataLength(wishlistProducts);
  const navItems = [
    {
      name: "Home",
      path: "/",
      accordion: null,
    
    },
    {
      name: "About",
      path: "#",
      accordion: null,
      accordionItems: [
        {
          name: "About",

          path: "/about",
        },
    
        {
          name: "FAQ",

          path: "/faq",
        },
     
      ],
    },
    {
      name: "Shop",
      path: "/shop",
      accordion: null,
      isNestedaccordion: null,
   
    },
  
    {
      name: "cart",
      path: "/cart",
      accordion: null,
    
    },
    {
      name: "Contact",
      path: "/contact",
      accordion: null,
    },
  ];
  return (
    <div
      id="ltn__utilize-mobile-menu"
      className="ltn__utilize ltn__utilize-mobile-menu"
    >
      <div className="ltn__utilize-menu-inner ltn__scrollbar">
        <div className="ltn__utilize-menu-head">
          <div className="site-logo">
            <Link href="/">
              <Image src="/img/logo.png" alt="Logo" width={154} height={42} />
            </Link>
          </div>
          <button className="ltn__utilize-close">×</button>
        </div>
        <div className="ltn__utilize-menu-search-form">
          <form action="#">
            <input type="text" placeholder="Search..." />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
        <div className="ltn__utilize-menu">
          <ul>
            {navItems?.map(({ name, path, accordionItems }, idx) => (
              <li key={idx}>
                <Link href={path}>{name}</Link>
                {accordionItems ? (
                  <ul className="sub-menu">
                    {accordionItems?.map(
                      ({ name: name1, path: path1, label }, idx1) => (
                        <li key={idx1}>
                          <Link href={path1}>
                            {name1}{" "}
                            {label ? (
                              <span className="menu-item-badge">{label}</span>
                            ) : (
                              ""
                            )}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="ltn__utilize-buttons ltn__utilize-buttons-2">
          <ul>
            <li>
              <Link href="/account" title="My Account">
                <span className="utilize-btn-icon">
                  <i className="far fa-user"></i>
                </span>
                My Account
              </Link>
            </li>
            <li>
              <Link href="/wishlist" title="Wishlist">
                <span className="utilize-btn-icon">
                  <i className="far fa-heart"></i>{" "}
                  <sup>{totalWishlistProduct}</sup>
                </span>
                Wishlist
              </Link>
            </li>
            <li>
              <Link href="/cart" title="Shoping Cart">
                <span className="utilize-btn-icon">
                  <i className="fas fa-shopping-cart"></i>{" "}
                  <sup>{totalCartProduct}</sup>
                </span>
                Shoping Cart
              </Link>
            </li>
          </ul>
        </div>
        <div className="ltn__social-media-2">
          <ul>
            <li>
              <Link href="https://www.facebook.com" title="Facebook">
                <i className="fab fa-facebook-f"></i>
              </Link>
            </li>
            <li>
              <Link href="https://x.com" title="Twitter">
                <i className="fab fa-twitter"></i>
              </Link>
            </li>
            <li>
              <Link href="https://www.linkedin.com" title="Linkedin">
                <i className="fab fa-linkedin"></i>
              </Link>
            </li>
            <li>
              <Link href="https://www.instagram.com" title="Instagram">
                <i className="fab fa-instagram"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
