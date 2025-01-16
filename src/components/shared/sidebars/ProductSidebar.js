"use client";
import SidebarBanner from "./widgets/SidebarBanner";
import SidebarSearch from "./widgets/SidebarSearch";
import ProductTags from "./widgets/ProductTags";
import ProductCategories from "./widgets/ProductCategories";
import PriceRange from "./widgets/PriceRange";
import SidebarTopRatedProducs from "./widgets/SidebarTopRatedProducs";
import ProductSizes from "./widgets/ProductSizes";
import ProductColors from "./widgets/ProductColors";

const ProductSidebar = () => {
  return (
    <aside className="sidebar ltn__shop-sidebar ltn__right-sidebar">
      {/* <!-- Category or Brands Widget --> */}
      {/* {<ProductCategories />} */}

      {/* <!-- Price Filter Widget --> */}

      {/* <!-- Top Rated Product Widget --> */}
      <SidebarTopRatedProducs />
      <PriceRange />

      {/* <!-- Search Widget --> */}
      <SidebarSearch />

      {/* <!-- Tagcloud Widget --> */}
      {/* <ProductTags /> */}

      {/* <!-- Size Widget --> */}
      {/* <ProductSizes /> */}

      {/* <!-- Color Widget --> */}
      {/* <ProductColors /> */}

      {/* <!-- Banner Widget --> */}
      <SidebarBanner image={"/img/makar sankranti/15.png"} />
    </aside>
  );
};

export default ProductSidebar;
