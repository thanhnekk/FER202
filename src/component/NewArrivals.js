import React, { useState } from "react";
import ProductList from "../component/ProductList";
const NewArrivals = ({ products }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2 style={{ marginBottom: "50px" }}>Hàng mới về</h2>
      <ProductList
        products={products}
        filterFn={(product) => product.isNew}
        title="Hàng mới về"
        btnhref="/products/new"
      />
    </div>
  );
};

export default NewArrivals;
