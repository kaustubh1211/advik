import Image from "next/image";

const Adress = () => {
  return (
    <div className="ltn__contact-address-area mb-90">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
              <div className="ltn__contact-address-icon">
                <Image
                  src="/img/icons/10.png"
                  width={84}
                  height={82}
                  alt="Icon Image"
                />
              </div>
              <h3>Email Address</h3>
              <p>
              info@ad-vik.com <br/>
                info@ad-vik.com
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
              <div className="ltn__contact-address-icon">
                <Image
                  src="/img/icons/10.png"
                  width={84}
                  height={82}
                  alt="Icon Image"
                />
              </div>
              <h3>Phone Number</h3>
              <p>
              +91 922 60 575 63 <br /> +91 922 60 575 63
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
              <div className="ltn__contact-address-icon">
                <Image
                  src="/img/icons/10.png"
                  width={84}
                  height={82}
                  alt="Icon Image"
                />
              </div>
              <h3>Office Address</h3>
              <p>
              Shop No. 03, G.M. Tower Society, Narangi Road,
               Virar- 401305 
               <br />
                
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adress;
