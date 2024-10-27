import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";

const SaleProducts = ({ products }) => {
  return (
    <div style={{
      textAlign: "center",
      backgroundColor: "#FEF9F0",
      padding: "50px 0px",
    }}>
      <style>
        {`
          @import url('https://fonts.cdnfonts.com/css/the-halloween');`}
      </style>
      <h2 style={{ marginBottom: "50px", textAlign: "center" }}>
        <img
          src="../assets/user/image/iconhalloween2.png"
          alt="halloween icon"
          style={{ width: "40px", height: "40px", marginRight: "5px" }}
        />
        <span style={{ fontFamily: "The Halloween" }}>Halloween Sales </span>
        <img
          src="../assets/user/image/iconhalloween.png"
          alt="halloween icon"
          style={{ width: "40px", height: "40px" }}
        />
      </h2>
      <ProductList
        products={products}
        filterFn={(product) => product.isSale}
        title="Giảm giá"
      />
    </div>
  );
};

export default SaleProducts;
