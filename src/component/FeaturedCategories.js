import React from "react";

const FeaturedCategories = ({ categories }) => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Danh mục nổi bật</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "20px 0",
        }}
      >
        {categories.map((category, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              flexShrink: 0,
              width: "250px",
              margin: "10px",
              transition: "transform 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <img
              src={category.image_link}
              alt={category.name}
              style={{
                width: "100%",
                height: "350px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "#fff",
                padding: "10px 0",
                textAlign: "center",
              }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
