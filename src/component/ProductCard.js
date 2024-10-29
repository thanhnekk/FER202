import React, { useState } from "react";
import { useContext } from "react";
import "../style/ProductCard.css";
import { CartContext } from "../context/CardContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, index, type }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const loggedInUser = sessionStorage.getItem("account");
    if (!loggedInUser) {
      alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
      navigate("/account");
      return;
    }
    addToCart(product);
    alert("Sản phẩm đã được thêm vào giỏ hàng.");
  };
  return (
    <div
      key={index}
      className="product-card-container"
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {type === "New" ? (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            backgroundColor: "orange",
            color: "white",
            padding: "5px",
            fontWeight: "bold",
            zIndex: 5,
          }}
        >
          <i className="bi bi-moon-stars-fill"></i>
          {type}
        </div>
      ) : type === "Sale" ? (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            backgroundColor: "red",
            color: "white",
            padding: "5px",
            fontWeight: "bold",
            zIndex: 5,
          }}
        >
          <i className="bi bi-lightning-charge-fill"></i>-
          {Math.floor(
            ((product.price - product.salePrice) / product.price) * 100
          )}
          %
        </div>
      ) : product.isNew ? (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            backgroundColor: "orange",
            color: "white",
            padding: "5px",
            fontWeight: "bold",
            zIndex: 5,
          }}
        >
          <i className="bi bi-moon-stars-fill"></i>
          New
        </div>
      ) : product.isSale && product.salePrice != null ? (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            backgroundColor: "red",
            color: "white",
            padding: "5px",
            fontWeight: "bold",
            zIndex: 5,
          }}
        >
          <i className="bi bi-lightning-charge-fill"></i>-
          {Math.floor(
            ((product.price - product.salePrice) / product.price) * 100
          )}
          %
        </div>
      ) : null}

      <img
        className="product-card-image"
        src={hoveredIndex === index ? product.images[1] : product.images[0]}
        alt={product.name}
        style={{
          width: "100%",
          height: "300px",
          objectFit: "cover",
          transition: "transform 0.3s",
          transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
        }}
      />
      <h6 style={{ margin: "10px 0", color: "black" }}>{product.name}</h6>
      <div>
        {product.salePrice ? (
          <span style={{ color: "red", fontWeight: "bold", fontSize: "15px" }}>
            {product.salePrice}₫{" "}
            <span
              style={{
                textDecoration: "line-through",
                color: "#999",
                marginTop: "5px",
                fontSize: "15px",
              }}
            >
              {product.price}₫
            </span>
          </span>
        ) : (
          <span
            style={{
              color: "black",
              marginTop: "5px",
              fontSize: "15px",
              fontWeight: "bold",
            }}
          >
            {product.price}₫
          </span>
        )}
      </div>

      {hoveredIndex === index && (
        <div className="product-card-buttons">
          <button
            onClick={(event) => {
              event.preventDefault();
              handleAddToCart();
            }}
            className="product-card-button"
          >
            <i className="bi bi-cart2"></i> Thêm vào giỏ
          </button>
          <button title="Xem nhanh" className="product-card-view-button">
            <i className="bi bi-eye"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
