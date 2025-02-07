import getAllProducts from "@/libs/getAllProducts";
import TopRatedProductCard from "../../cards/TopRatedProductCard";
import { useEffect , useState } from "react";
const SidebarTopRatedProducs = () => {
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts(); // ✅ Await the API response
        const topRatedProducts = allProducts.filter(({ topRated }) => topRated).slice(0, 3);
        setProducts(topRatedProducts);
      } catch (error) {
        console.error("Error fetching top-rated products:", error);
        setProducts([]); // Ensure it never breaks
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="widget ltn__top-rated-product-widget">
      <h4 className="ltn__widget-title ltn__widget-title-border">
        Top Rated Product
      </h4>
      <ul>
        {products?.map((product, idx) => (
          <li key={idx}>
            <TopRatedProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarTopRatedProducs;
