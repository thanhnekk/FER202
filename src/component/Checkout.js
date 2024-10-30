import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CardContext";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../style/Checkout.css";
import Header from "../component/Header";
import Footer from "../component/Footer";
import Breadcrumb from "../component/Breadcrump";

const Checkout = () => {
  const { clearCart, removeFromCart } = useContext(CartContext);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [user, setUser] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();
  const location = useLocation();

  const selectedProducts = location.state?.selectedCartItems || [];
  const loggedInUser = JSON.parse(sessionStorage.getItem("account"));

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/account");
    } else {
      if (loggedInUser.role !== "customer") {
        navigate("/404");
      } else {
        setUser(loggedInUser);
        setSelectedAddress(loggedInUser.address[0] || "");
      }
    }
  }, [navigate]);

  useEffect(() => {
    axios.get("http://localhost:9999/users/" + loggedInUser.id).then((res) => {
      setUser(res.data);
      console.log(loggedInUser.id);
    });
  }, []);

  const totalAmount = selectedProducts.reduce(
    (acc, item) => acc + (item.salePrice || item.price) * item.quantity,
    0
  );
  const shippingFee = totalAmount < 700000 ? 30000 : 0;
  const grandTotal = totalAmount + shippingFee;

  const handleCheckout = async () => {
    if (!selectedAddress) {
      alert("Vui lòng chọn địa chỉ giao hàng!");
      return;
    }

    const order = {
      id: Date.now(),
      customerId: loggedInUser.id,
      items: selectedProducts,
      address: selectedAddress,
      date: new Date().toLocaleDateString(),
      paymentMethod: paymentMethod,
      status: "Đang chờ",
      totalAmount,
      shippingFee,
      grandTotal,
    };

    console.log("Đơn hàng đã tạo:", order);

    try {
      await axios.post("http://localhost:9999/orders", order);
      selectedProducts.forEach((product) => removeFromCart(product.id));

      alert("Đơn hàng đã đặt thành công!");
      navigate("/");
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!");
    }
  };

  const handleAddNewAddress = async () => {
    if (newAddress.trim() === "") {
      alert("Vui lòng nhập địa chỉ mới!");
      return;
    }

    const updatedUser = { ...user, address: [...user.address, newAddress] };
    setUser(updatedUser);
    setSelectedAddress(newAddress);

    try {
      await axios.put(
        "http://localhost:9999/users/" + loggedInUser.id,
        updatedUser
      );
      alert("Địa chỉ đã được thêm thành công!");
      setUser(updatedUser);
    } catch (error) {
      console.error("Lỗi khi thêm địa chỉ:", error);
      alert("Có lỗi xảy ra khi thêm địa chỉ. Vui lòng thử lại!");
    }

    setNewAddress("");
  };

  return (
    <div>
      <Header />
      <Breadcrumb text="Checkout" prevtext="Giỏ hàng" prevlink="/cart" />
      <div className="checkout-container">
        <h2>Đặt hàng</h2>
        <div className="checkout-items">
          {selectedProducts.map((product) => (
            <div key={product.id} className="checkout-item">
              <h4>{product.name}</h4>
              <p>Số lượng: {product.quantity}</p>
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
              <p>
                Tổng tiền:{" "}
                {(product.salePrice || product.price) * product.quantity}₫
              </p>
            </div>
          ))}
        </div>

        <div className="summary">
          <p>Tổng tiền hàng: {totalAmount.toLocaleString()}₫</p>
          <p>
            Phí vận chuyển: {shippingFee.toLocaleString()}₫ (Miễn phí với đơn
            hàng trên 699000đ)
          </p>
          <h3>Tổng thanh toán: {grandTotal.toLocaleString()}₫</h3>
        </div>

        <label>Chọn địa chỉ giao hàng:</label>
        <select
          value={selectedAddress}
          onChange={(e) => setSelectedAddress(e.target.value)}
          className="address-select"
        >
          {user?.address?.map((addr, index) => (
            <option key={index} value={addr}>
              {addr}
            </option>
          ))}
        </select>

        <div className="add-address">
          <input
            type="text"
            placeholder="Thêm địa chỉ mới"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            className="address-input"
          />
          <button onClick={handleAddNewAddress} className="add-address-btn">
            Thêm địa chỉ
          </button>
        </div>

        <label>Chọn phương thức thanh toán:</label>
        <div className="payment-methods">
          <label>
            <input
              type="radio"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
            />
            Thanh toán khi nhận hàng (COD)
          </label>
          <label>
            <input
              type="radio"
              value="VNPay"
              checked={paymentMethod === "VNPay"}
              onChange={() => setPaymentMethod("VNPay")}
            />
            VNPay
          </label>
        </div>

        <button onClick={handleCheckout} className="checkout-btn">
          Hoàn tất đơn hàng
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
