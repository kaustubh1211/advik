/* eslint-disable jsx-a11y/role-supports-aria-props */
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Faq2 = () => {
  return (
    <div className="ltn__faq-area pt-115 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area ltn__section-title-2 text-center">
              <h1 className="section-title white-color---">Some Questions</h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="ltn__faq-inner ltn__faq-inner-2">
              <div id="accordion_2">
                {/* <!-- card --> */}
                <div className="card">
                  <h6
                    className="collapsed ltn__card-title"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-item-2-1"
                    aria-expanded="false"
                  >
                    What materials are used in products?


                  </h6>
                  <div
                    id="faq-item-2-1"
                    className="collapse"
                    data-bs-parent="#accordion_2"
                  >
                    <div className="card-body">
                      <p>
                      Our products are made from high-quality, sustainable bamboo, ensuring durability and eco-friendliness. We also use biodegradable or recyclable materials for additional components, like bristles or ink refills.
                      </p>
                    </div>
                  </div>
                </div>
                {/* <!-- card --> */}
                {/* <div className="card">
                  <h6
                    className="ltn__card-title"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-item-2-2"
                    aria-expanded="true"
                  >
                    How can i make refund from your website?
                  </h6>
                  <div
                    id="faq-item-2-2"
                    className="collapse show"
                    data-bs-parent="#accordion_2"
                  >
                    <div className="card-body">
                      <div className="ltn__video-img alignleft">
                        <Image
                          style={{ height: "auto" }}
                          src="/img/bg/17.jpg"
                          alt="video popup bg image"
                          width={220}
                          height={140}
                        />
                        <Link
                          className="ltn__video-icon-2 ltn__video-icon-2-small ltn__video-icon-2-border----"
                          href="https://www.youtube.com/embed/LjCzPp-MK48?autoplay=1&showinfo=0"
                          data-rel="lightcase:myCollection"
                        >
                          <i className="fa fa-play"></i>
                        </Link>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Scelerisque{" "}
                      </p>
                    </div>
                  </div>
                </div> */}
                {/* <!-- card --> */}
                <div className="card">
                  <h6
                    className="collapsed ltn__card-title"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-item-2-3"
                    aria-expanded="false"
                  >
                    I am a new user. How should I start?
                  </h6>
                  <div
                    id="faq-item-2-3"
                    className="collapse"
                    data-bs-parent="#accordion_2"
                  >
                    <div className="card-body">
                      <p>
                      Browse our products: Explore our categories and use the search bar to find specific items
Create an account: Click the "Sign Up" button to create your personal account
Add items to cart: Simply click "Add to Cart" for items you want to purchase
Checkout securely: Enter your shipping and payment information to complete your purchase
                      </p>
                    </div>
                  </div>
                </div>
                {/* <!-- card --> */}
                <div className="card">
                  <h6
                    className="collapsed ltn__card-title"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-item-2-4"
                    aria-expanded="false"
                  >
                    Returns and refunds
                  </h6>
                  <div
                    id="faq-item-2-4"
                    className="collapse"
                    data-bs-parent="#accordion_2"
                  >
                    <div className="card-body">
                      <p>
                      Return Window: You have 30 days from delivery to initiate a return
                      Condition Requirements: Items must be unused, in original packaging, with all tags attached
                      </p>
                    </div>
                  </div>
                </div>
                {/* <!-- card --> */}
                <div className="card">
                  <h6
                    className="collapsed ltn__card-title"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-item-2-5"
                    aria-expanded="false"
                  >
                    Are my details secured?
                  </h6>
                  <div
                    id="faq-item-2-5"
                    className="collapse"
                    data-bs-parent="#accordion_2"
                  >
                    <div className="card-body">
                      <p>
                      Secure Encryption: All transactions are protected with industry-standard SSL encryption
Payment Security: We never store your complete credit card information
Personal Data Protection: Your personal information is securely stored and never shared with third parties
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <aside className="sidebar-area ltn__right-sidebar mt-6">
              {/* <!-- Banner Widget --> */}
              <div className="widget ltn__banner-widget">
                <Link href="/shop">
                  <Image
                    style={{ height: "auto" }}
                    src="/img/Product Photos/4.png"
                    alt="Banner Image"
                    width={631}
                    height={500}
                  />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq2;
