

const getAllProducts = () => {
  return fetch("api/product/page", { cache: "no-store" })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    })
    .then((allProducts) => {
      const images = [
        "/img/PRODUCTPHOTOS/6.png",
        "/img/PRODUCTPHOTOS/3.png",
        "/img/PRODUCTPHOTOS/5.png",
        "/img/PRODUCTPHOTOS/1.png",
        "/img/PRODUCTPHOTOS/4.png",
        "/img/PRODUCTPHOTOS/2.png",
      ];
      return allProducts.map((product, idx) => ({
        ...product,
        image: images[idx % images.length], // Assign images in a loop
      }));
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      return [];
    });
};

export default getAllProducts;
