import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "../context/CardContext";
import { Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumb from "../component/Breadcrump";
import "../style/Cart.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateCartItemQuantity } =
    useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const [showClearAllModal, setShowClearAllModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(sessionStorage.getItem("account"));

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/account");
    }
    if (loggedInUser.role !== "customer") {
      navigate("/404");
    }
  }, [navigate, loggedInUser]);

  useEffect(() => {
    axios.get("http://localhost:9999/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);
  const handleShowModal = (product) => {
    setProductToDelete(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setProductToDelete(null);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      removeFromCart(productToDelete.id);
      setSelectedProducts(
        selectedProducts.filter((id) => id !== productToDelete.id)
      );
    }
    handleCloseModal();
  };

  const handleQuantityChange = (product, value) => {
    const quantity = parseInt(value, 10) || 0;

    if (quantity <= 0) {
      handleShowModal(product);
    } else if (quantity > product.inStock) {
      updateCartItemQuantity(product.id, product.inStock);
    } else {
      updateCartItemQuantity(product.id, quantity);
    }
  };

  const handleProductSelect = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === cart.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(cart.map((product) => product.id));
    }
  };

  const totalAmount = cart
    .filter((item) => selectedProducts.includes(item.id))
    .reduce(
      (acc, item) =>
        acc + (item.salePrice ? item.salePrice : item.price) * item.quantity,
      0
    );

  const handleClearAll = () => {
    setShowClearAllModal(true);
  };

  const confirmClearAll = () => {
    clearCart();
    setSelectedProducts([]);
    setShowClearAllModal(false);
  };

  const handleCheckout = () => {
    const selectedCartItems = cart.filter((product) =>
      selectedProducts.includes(product.id)
    );
    navigate("/checkout", { state: { selectedCartItems } });
  };

  return (
    <>
      <Header categories={categories} />
      <Breadcrumb text="Giỏ hàng"></Breadcrumb>
      <div className="cart-container container mt-4">
        <h2 className="mb-4">Giỏ hàng của bạn</h2>
        <div className="row">
          <div className="col-md-8">
            {cart.length > 0 && (
              <Button
                variant="outline-primary"
                onClick={handleSelectAll}
                className="mb-3"
              >
                {selectedProducts.length === cart.length
                  ? "Bỏ chọn tất cả"
                  : "Chọn tất cả"}
              </Button>
            )}
            {cart.map((product, index) => (
              <React.Fragment key={product.id}>
                <div className="cart-item d-flex align-items-center p-3">
                  <Form.Check
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleProductSelect(product.id)}
                    className="me-3"
                  />
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details ms-3">
                    <h4>{product.name}</h4>
                    <p>
                      {product.salePrice ? (
                        <>
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            {product.salePrice}₫
                          </span>
                          <span
                            style={{
                              color: "gray",
                              textDecoration: "line-through",
                              marginLeft: "10px",
                            }}
                          >
                            {product.price}₫
                          </span>
                        </>
                      ) : (
                        <span>{product.price}₫</span>
                      )}
                    </p>

                    <div className="quantity-controls d-flex align-items-center">
                      <Button
                        variant="light"
                        onClick={() =>
                          handleQuantityChange(product, product.quantity - 1)
                        }
                        disabled={product.quantity <= 1}
                      >
                        <i className="bi bi-dash-lg"></i>
                      </Button>
                      <input
                        type="number"
                        value={product.quantity}
                        onChange={(e) =>
                          handleQuantityChange(product, e.target.value)
                        }
                        className="quantity-input mx-2"
                        style={{ width: "50px", textAlign: "center" }}
                        min="1"
                        max={product.inStock}
                      />
                      <Button
                        variant="light"
                        onClick={() =>
                          handleQuantityChange(product, product.quantity + 1)
                        }
                        disabled={product.quantity >= product.inStock}
                      >
                        <i className="bi bi-plus-lg"></i>
                      </Button>
                    </div>
                    <small className="text-muted">
                      {product.inStock} sản phẩm có sẵn
                    </small>
                  </div>
                  <Button
                    variant="danger"
                    onClick={() => handleShowModal(product)}
                    className="ms-auto"
                  >
                    Xóa
                  </Button>
                </div>
                {index < cart.length - 1 && <hr />}
              </React.Fragment>
            ))}
          </div>
          <div className="col-md-4">
            <div className="order-summary p-3 border">
              <h4>Thông tin đơn hàng</h4>
              <p className="d-flex justify-content-between">
                Tổng tiền: <span>{totalAmount.toLocaleString()}₫</span>
              </p>
              <hr />
              <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                <li>Phí vận chuyển sẽ được tính ở trang thanh toán.</li>
                <li>Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.</li>
              </ul>
              <Button
                variant="dark"
                block
                onClick={handleCheckout}
                disabled={selectedProducts.length === 0}
              >
                Thanh toán
              </Button>
            </div>
          </div>
        </div>

        {cart.length > 0 && (
          <Button
            variant="outline-danger"
            onClick={handleClearAll}
            className="mt-4"
          >
            Xóa tất cả
          </Button>
        )}

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận xóa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Hủy
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Xóa
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showClearAllModal}
          onHide={() => setShowClearAllModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận xóa tất cả</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowClearAllModal(false)}
            >
              Hủy
            </Button>
            <Button variant="danger" onClick={confirmClearAll}>
              Xóa tất cả
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
