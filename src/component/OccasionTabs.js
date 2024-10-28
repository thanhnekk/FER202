import React, { useState, useEffect } from "react";
import ProductTab from "./ProductTab";
import ListAllButton from "./ListAllButton";

const OccasionTabs = ({ products }) => {
  const [activeTab, setActiveTab] = useState("Đi làm");

  const tabData = {
    "Đi làm": products.filter((product) => product.occasion === "Đi làm"),
    "Đi chơi": products.filter((product) => product.occasion === "Đi chơi"),
    "Đi tiệc": products.filter((product) => product.occasion === "Đi tiệc"),
  };

  return (
    <ul
      className="product-tabs nav nav-tabs"
      style={{
        textAlign: "center",
        padding: "50px 0",
        listStyle: "none",
        borderBottom: "2px solid #ddd",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <li
        className="nav-item"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {Object.keys(tabData).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? "nav-link active" : "nav-link"}
            style={{
              padding: "10px 20px",
              border: "none",
              backgroundColor: activeTab === tab ? "#007bff" : "transparent",
              color: activeTab === tab ? "white" : "#007bff",
              cursor: "pointer",
              margin: "0 10px",
              borderRadius: "5px",
              transition: "background-color 0.3s, color 0.3s",
            }}
          >
            {tab}
          </button>
        ))}
      </li>

      <div className="tab-content" style={{ marginTop: "20px" }}>
        <ProductTab
          title={activeTab}
          products={tabData[activeTab]}
          type="Others"
        />
      </div>

      <ListAllButton text="Xem Tất Cả" href="/products/all" />
    </ul>
  );
};

export default OccasionTabs;
