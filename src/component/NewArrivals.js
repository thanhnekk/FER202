import React, { useState } from "react";

const NewArrivals = ({ products }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Hàng mới về</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {products
          .filter((product) => product.isNew)
          .slice(0, 10)
          .map((product, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                position: "relative",
                width: "250px",
                height: "380px",
                overflow: "hidden",
                textAlign: "center",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  backgroundColor: "red",
                  color: "white",
                  padding: "5px",
                  fontWeight: "bold",
                }}
              >
                -30%
              </div>
              <img
                src={product.images[0]}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  transition: "transform 0.3s",
                }}
              />
              <h6 style={{ margin: "10px 0" }}>{product.name}</h6>
              <p>{product.code}</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span
                  style={{ color: "red", fontWeight: "bold", fontSize: "10px" }}
                >
                  {product.salePrice}₫{" "}
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "#999",
                      marginTop: "5px",
                      fontSize: "10px",
                    }}
                  >
                    {product.price}₫
                  </span>
                </span>
              </div>

              {hoveredIndex === index && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "100px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    justifyContent: "space-between",
                    width: "90%",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      border: "1px solid #ddd",
                      borderRadius: "10px",
                      padding: "5px 10px",
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "black";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "white";
                      e.currentTarget.style.color = "black";
                    }}
                  >
                    <i className="bi bi-cart2"></i> Thêm vào giỏ hàng
                  </button>
                  <button
                    title="Xem nhanh"
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      border: "1px solid #ddd",
                      borderRadius: "10px",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          border: "1px solid #333",
          backgroundColor: "transparent",
          cursor: "pointer",
          borderRadius: "20px",
        }}
      >
        Xem tất cả Hàng mới về
      </button>
    </div>
  );
};

export default NewArrivals;
