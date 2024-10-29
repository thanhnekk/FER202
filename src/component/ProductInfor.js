import { useState, useEffect } from "react";
import "../style/ProductInfor.css";
import RelateProduct from "./RelateProduct";
const ProductInfor = ({ product, listproduct }) => {
  const [selectedImage, setSelectedImage] = useState(
    product.images && product.images.length > 0 ? product.images[0] : ""
  );
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (type) => {
    setQuantity((prev) =>
      type === "increase" ? prev + 1 : prev > 1 ? prev - 1 : 1
    );
  };
  useEffect(() => {
    if (product.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product.images]);

  return (
    <div>
      <div className="product-infomation" style={{ margin: "50px" }}>
        <div className="product-img">
          <div className="selected-img">
            <img src={selectedImage} alt={product.name} />
          </div>
          <div className="other-img">
            {product.images &&
              product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="product"
                  onClick={() => setSelectedImage(image)}
                  className={`thumbnail ${
                    selectedImage === image ? "active" : ""
                  }`}
                />
              ))}
          </div>
        </div>
        <div className="product-detail">
          <h3>{product.name}</h3>
          <h5>
            Mã sản phẩm : {product.id} | Tình trạng:{" "}
            {product.inStock > 0 ? "Còn Hàng" : "Hết Hàng"}
          </h5>
          <table className="product-info-table">
            <tbody>
              <tr>
                <td>Giá:</td>
                <td>
                  {product.salePrice != null && product.isSale ? (
                    <>
                      <span className="sale-price">{product.salePrice}₫</span>
                      <span className="original-price">{product.price}₫</span>
                      <span className="discount">
                        <i className="bi bi-lightning-charge-fill"></i>-
                        {Math.floor(
                          ((product.price - product.salePrice) /
                            product.price) *
                            100
                        )}
                        %
                      </span>
                    </>
                  ) : (
                    <span className="price">{product.price}₫</span>
                  )}
                </td>
              </tr>
              <tr>
                <td>Số lượng:</td>
                <td>
                  <div
                    className="quantity-selector"
                    style={{ marginLeft: "20px" }}
                  >
                    <button onClick={() => handleQuantityChange("decrease")}>
                      <i className="bi bi-dash-lg"></i>
                    </button>
                    <input type="text" value={quantity} readOnly />
                    <button onClick={() => handleQuantityChange("increase")}>
                      <i className="bi bi-plus-lg"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <button className="add-to-cart-btn">Thêm vào giỏ</button>
            <button className="buy-now-btn">Mua ngay</button>
          </div>

          <hr className="separator" />
          <h4 style={{ marginTop: "10px" }} className="text-center">
            Vận chuyển
          </h4>
          <img
            style={{
              width: "100%",
              marginTop: "30px",
              border: "1px black solid",
            }}
            src="/assets/user/image/ship.png"
            alt="ship"
          />

          <h4 style={{ marginTop: "30px" }} className="text-center">
            Đổi hàng & Trả hàng
          </h4>
          <img
            style={{
              width: "100%",
              marginTop: "30px",
              border: "1px black solid",
            }}
            src="/assets/user/image/chinhsach.png"
            alt="ship"
          />
        </div>
      </div>
      <div>
        <RelateProduct
          products={listproduct}
          catid={product.categoryId}
          id={product.id}
        ></RelateProduct>
      </div>
    </div>
  );
};

export default ProductInfor;
