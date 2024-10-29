import ProductCard from "./ProductCard";

const RelateProduct = ({ products, catid, id }) => {
  return (
    <div className="relate-product-container" style={{ margin: "10px" }}>
      <h2 className="text-center">Sản phẩm liên quan</h2>
      <div
        className="d-flex"
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {products
          .filter(
            (product) => product.id !== id && product.categoryId === catid
          )
          .slice(0, 5)
          .map((product, index) => (
            <a
              href={`/products/${product.id}`}
              style={{ textDecoration: "none" }}
              key={index}
              className=""
            >
              <ProductCard product={product} index={index} type={""} />
            </a>
          ))}
      </div>
    </div>
  );
};

export default RelateProduct;
