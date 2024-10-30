import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../component/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../component/Footer";
const Account = () => {
  const navigate = useNavigate();

  // Retrieve user data from session storage
  const user = JSON.parse(sessionStorage.getItem("account"));
  console.log(user);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9999/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);
  const addressOptions = user.address;
  const [selectedAddress, setSelectedAddress] = useState(user.address);
  return (
    <div>
      <Header categories={categories} />
      <div
        className="container"
        style={{ margin: "100px auto", maxWidth: "1000px" }}
      >
        <h1>Tài Khoản của Tôi</h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Thông Tin Cá Nhân</h5>
            <p>
              <strong>Tên:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {user.phonenumber}
            </p>
            {user.address && (
              <p>
                <strong>Địa chỉ:</strong>
                <select
                  value={selectedAddress}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                  className="form-select"
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
      </div>
      <Footer />
    </div>
  );
};

export default Account;
