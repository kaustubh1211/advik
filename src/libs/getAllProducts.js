import allProducts from "@/../public/fakedata/products.json";
import comments from "@/../public/fakedata/productComments.json";
import reviews from "@/../public/fakedata/productReviews.json";
const productImage1 = "/img/Product-PHOTOS-2/6.png";
const productImage2 = "/img/Product-PHOTOS-2/4.png";
const productImage3 = "/img/Product-PHOTOS-2/3.png";
const productImage4 = "/img/Product-PHOTOS-2/2.png";
const productImage5 = "/img/Product-PHOTOS-2/5.png";
const productImage6 = "/img/Product-PHOTOS-2/1.png";
const productImage7 = "/img/product/7.png";
const productImage8 = "/img/product/8.png";
const productImage9 = "/img/product/9.png";
const productImage10 = "/img/product/10.png";
const productImage11 = "/img/product/11.png";
const productImage12 = "/img/product/12.png";

const getAllProducts = () => {
  const images = [
    productImage1,
    productImage2,
    productImage3,
    productImage4,
    productImage5,
    productImage6,
   
   
  ];

  const products = [...allProducts]?.map((product, idx) => ({
    ...product,

    image: images[idx],
    comments: comments?.filter(({ productId }) => productId === product?.id),
    reviews: reviews?.filter(({ productId }) => productId === product?.id),
  }));

  return products;
};

export default getAllProducts;
