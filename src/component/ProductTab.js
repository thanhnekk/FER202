import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const ProductTab = ({ title, products, type }) => {
  const [itemsToShow, setItemsToShow] = useState(12);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setItemsToShow(2);
      } else if (width <= 768) {
        setItemsToShow(4);
      } else if (width <= 1200) {
        setItemsToShow(6);
      } else {
        setItemsToShow(12);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="tab">
      {" "}
      <div
        className="product-cards"
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {products.slice(0, itemsToShow).map((product, index) => (
          <ProductCard
            product={product}
            index={index}
            type={type}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductTab;
