import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ListAllButton from "./ListAllButton";

const ProductList = ({ products, filterFn, title, isShowAll, btnhref }) => {
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
      } else if (width <= 1440) {
        setItemsToShow(8);
      } else {
        setItemsToShow(10);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "30px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
        className="product-card-grid"
      >
        {!isShowAll ? (
          <>
            {products
              .filter(
                (product) => product.status === "Activate" && filterFn(product)
              )
              .slice(0, itemsToShow)
              .map((product, index) => (
                <a
                  href={`/products/${product.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <ProductCard
                    product={product}
                    index={index}
                    type={
                      title === "Hàng mới về"
                        ? "New"
                        : title === "Giảm giá"
                        ? "Sale"
                        : ""
                    }
                    key={index}
                  />
                </a>
              ))}
            <div>
              <ListAllButton
                text={`Xem tất cả sản phẩm ${title.toLowerCase()}`}
                href={btnhref}
              />
            </div>
          </>
        ) : (
          <>
            {products
              .filter(
                (product) => product.status === "Activate" && filterFn(product)
              )
              .map((product, index) => (
                <a
                  href={`/products/${product.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <ProductCard
                    product={product}
                    index={index}
                    type={
                      title === "Hàng mới về"
                        ? "New"
                        : title === "Giảm giá"
                        ? "Sale"
                        : ""
                    }
                    key={index}
                  />
                </a>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
