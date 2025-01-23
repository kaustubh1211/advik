
import allProducts from "@/../public/fakedata/newProducts.json";

import comments from "@/../public/fakedata/productComments.json";
import reviews from "@/../public/fakedata/productReviews.json";
const productImage1 = "/img/PRODUCTPHOTOS/6.png";
const productImage2 = "/img/PRODUCTPHOTOS/4.png";
const productImage3 = "/img/PRODUCTPHOTOS/3.png";
const productImage4 = "/img/PRODUCTPHOTOS/2.png";
const productImage5 = "/img/PRODUCTPHOTOS/5.png";
const productImage6 = "/img/PRODUCTPHOTOS/1.png";
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
    // comments: comments?.filter(({ productId }) => productId === product?.id),
    // reviews: reviews?.filter(({ productId }) => productId === product?.id),
  }));

  return products;
};

export default getAllProducts;
