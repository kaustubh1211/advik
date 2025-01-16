import Image from "next/image";
import React from "react";

const About5 = ({ pt }) => {
  return (
    <div className={`ltn__about-us-area ${pt ? pt : "pt-120"} pb-120`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 align-self-center">
            <div className="about-us-img-wrap about-img-left">
              <Image
                src="/img/Product Photos/7.png"
                alt="About Us Image"
                width={570}
                height={531}
              />
            </div>
          </div>
          <div className="col-lg-6 align-self-center">
            <div className="about-us-info-wrap">
              <div className="section-title-area ltn__section-title-2">
                <h6 className="section-subtitle ltn__secondary-color">
                  Know More About Shop
                </h6>
                <h1  className="section-title">
                Healthy Living Begins <br className="d-none d-md-block" /> 
                with Sustainability
                </h1>
                <p>
                Our bamboo products are a perfect blend of nature and functionality, designed to reduce waste and promote an eco-friendly lifestyle.
                </p>
              </div>
              <p>
              Made from 100% natural bamboo, these products are durable, biodegradable, and stylish. Whether it is bamboo bottles, utensils, or home decor, they are crafted to meet your needs while caring for the planet.
              Sustainability is at the core of what we do. Each product is thoughtfully designed to minimize environmental impact, ensuring a greener future for generations to come. Choose bamboo—because every small step towards eco-friendliness counts.
              </p>
              {/* <div className="about-author-info d-flex">
                <div className="author-name-designation  align-self-center mr-30">
                  <h4 className="mb-0">Jerry Henson</h4>
                  <small>/ Shop Director</small>
                </div>
                <div className="author-sign  align-self-center">
                  <Image
                    src="/img/icons/icon-img/author-sign.png"
                    alt="#"
                    width={35}
                    height={500}
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About5;
