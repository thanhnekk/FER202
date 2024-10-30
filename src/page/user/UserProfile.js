import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import MyOrders from "../user/MyOrder";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(sessionStorage.getItem("account"));
  const addressOptions = loggedInUser.address;
  const [selectedAddress, setSelectedAddress] = useState(loggedInUser.address);

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/account");
    } else if (loggedInUser.role !== "customer") {
      navigate("/404");
    }
  }, [navigate, loggedInUser]);

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <aside style={{ flex: "1", marginRight: "20px" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <img
              src="https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png"
              alt="Avatar"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                marginBottom: "10px",
              }}
            />
            <h3>{loggedInUser.username}</h3>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Sửa Hồ Sơ
            </button>
          </div>
          <ul
            style={{
              listStyle: "none",
              padding: "0",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          >
            <li
              onClick={() => setActiveTab("profile")}
              style={{
                padding: "10px",
                cursor: "pointer",
                backgroundColor: activeTab === "profile" ? "#007bff" : "#fff",
                color: activeTab === "profile" ? "#fff" : "#000",
              }}
            >
              Hồ Sơ
            </li>
            <li
              onClick={() => setActiveTab("orders")}
              style={{
                padding: "10px",
                cursor: "pointer",
                backgroundColor: activeTab === "orders" ? "#007bff" : "#fff",
                color: activeTab === "orders" ? "#fff" : "#000",
              }}
            >
              Đơn Hàng
            </li>
          </ul>
        </aside>
        <main
          style={{
            flex: "3",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        >
          {activeTab === "profile" ? (
            <div>
              <h1>Tài Khoản của Tôi</h1>
              <div
                className="card"
                style={{
                  padding: "20px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              >
                <h5 className="card-title">Thông Tin Cá Nhân</h5>
                <p>
                  <strong>Tên:</strong> {loggedInUser.username}
                </p>
                <p>
                  <strong>Email:</strong> {loggedInUser.email}
                </p>
                <p>
                  <strong>Số điện thoại:</strong> {loggedInUser.phonenumber}
                </p>
                {loggedInUser.address && (
                  <p>
                    <strong>Địa chỉ:</strong>
                    <select
                      value={selectedAddress}
                      onChange={(e) => setSelectedAddress(e.target.value)}
                      className="form-select"
                      style={{ marginLeft: "10px", padding: "5px" }}
                    >
                      {addressOptions.map((address, index) => (
                        <option key={index} value={address}>
                          {address}
                        </option>
                      ))}
                    </select>
                  </p>
                )}
              </div>
            </div>
          ) : (
            <MyOrders />
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
