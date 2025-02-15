"use client"
import Image from "next/image";
import Link from "next/link";
import { useState , useEffect } from "react";
const Hero2 = () => {
 const [isClient, setIsClient] = useState(false);
 
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="ltn__slider-area ltn__slider-3  section-bg-1">
      <div className="ltn__slide-one-active slick-slide-arrow-1 slick-slide-dots-1">
        {/* <!-- ltn__slide-item --> */}
        <div className="ltn__slide-item ltn__slide-item-2 ltn__slide-item-3 ltn__slide-item-3-normal">
          <div className="ltn__slide-item-inner">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 align-self-center">
                  <div className="slide-item-info">
                    <div className="slide-item-info-inner ltn__slide-animation">
                      <div className="slide-video mb-50 d-none">
                        <Link
                          className="ltn__video-icon-2 ltn__video-icon-2-border"
                          href="https:www.youtube.com/embed/ATI7vfCgwXE?autoplay=1&showinfo=0"
                          data-rel="lightcase:myCollection"
                        >
                          <i className="fa fa-play"></i>
                        </Link>
                      </div>
                      <h6 className="slide-sub-title animated">
                        <Image
                          width={29}
                          height={27}
                          src="/img/Product Photos/1.png"
                          alt="#"
                        />{" "}
                        100% genuine Products
                      </h6>
                      <h1 className="slide-title animated ">
                      Eco-Friendly  <br/> Bamboo Products

                      </h1>
                      <div className="slide-brief animated">
                        <p>
                        Embrace eco-friendly living with our premium bamboo bottles, designed to keep your beverages fresh while protecting the planet. Crafted from 100% natural bamboo.
                        </p>
                      </div>
                      <div className="btn-wrapper animated">
                        <Link
                          href="/shop"
                          className="theme-btn-1 btn btn-effect-1 text-uppercase"
                        >
                          Explore Products
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="slide-item-img">
                    <Image
                      src="/img/Product Photos/5.png"
                      alt="#"
                      width={1100}
                      height={801}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- ltn__slide-item --> */}
        <div className="ltn__slide-item ltn__slide-item-2 ltn__slide-item-3 ltn__slide-item-3-normal">
          <div className="ltn__slide-item-inner  text-right text-end">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 align-self-center">
                  <div className="slide-item-info">
                    <div className="slide-item-info-inner ltn__slide-animation">
                      <h6 className="slide-sub-title ltn__secondary-color animated">
                        {"//"} TALENTED ENGINEER & MECHANICS
                      </h6>
                      <h1 className="slide-title animated ">
                      Healthy Living Begins <br/> with Sustainability
                        
                      </h1>
                      <div className="slide-brief animated">
                        <p>
                        Our bamboo products are a perfect blend of nature and functionality, designed to reduce waste and promote an eco-friendly lifestyle.
                        </p>
                      </div>
                      <div className="btn-wrapper animated">
                        <Link
                          href="/shop"
                          className="theme-btn-1 btn btn-effect-1 text-uppercase"
                        >
                          Explore Products
                        </Link>
                        <Link
                          href="/about"
                          className="btn btn-transparent btn-effect-3"
                        >
                          LEARN MORE
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="slide-item-img slide-img-left">
                    <Image
                      src="/img/Product Photos/2.png"
                      alt="#"
                      width={694}
                      height={605}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;
