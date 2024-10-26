import React from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Slider = ({ sliders }) => {
  return (
    <div className="slider">
      <div id="carouselExampleIndicators" className="carousel slide">
        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {sliders.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Carousel Images */}
        <div className="carousel-inner">
          {sliders.map((slider, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={slider.image_link}
                className="d-block w-100"
                alt={`Slide ${index + 1}`}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  maxHeight: "600px",
                }}
              />
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Slider;
