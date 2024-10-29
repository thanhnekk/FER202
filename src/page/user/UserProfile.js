// UserProfile.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import "../../style/Profile.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(sessionStorage.getItem("account"));

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
      <div className="profile-container">
        <aside className="sidebar">
          <div className="profile-info">
            <img
              src="https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png"
              alt="Avatar"
              className="avatar"
            />
            <h3>{loggedInUser.username}</h3>
            <button className="edit-profile-btn">Sửa Hồ Sơ</button>
          </div>
          <ul className="menu">
            <li>Tài Khoản Của Tôi</li>
            <li className="active">Hồ Sơ</li>
            <li>Đơn Hàng</li>
            <li>Địa Chỉ</li>
            <li>Đổi Mật Khẩu</li>
          </ul>
        </aside>
        <main className="profile-content">
          <h2>Hồ Sơ Của Tôi</h2>
          <form className="profile-form">
            <label>
              Tên đăng nhập
              <input type="text" value={loggedInUser.username} readOnly />
            </label>
            <label>
              Tên
              <input type="text" value={loggedInUser.username} />
            </label>
            <label>
              Email
              <input type="text" value={loggedInUser.email} readOnly />
              <button className="change-btn">Thay Đổi</button>
            </label>
            <label>
              Số điện thoại
              <button className="add-btn">Thêm</button>
            </label>
            <label>
              Giới tính
              <div className="gender-options">
                <label>
                  <input type="radio" name="gender" checked /> Nam
                </label>
                <label>
                  <input type="radio" name="gender" defaultChecked /> Nữ
                </label>
              </div>
            </label>
            <label>
              Ngày sinh
              <input type="text" value="" readOnly />
              <button className="change-btn">Thay Đổi</button>
            </label>
            <button className="save-btn">Lưu</button>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
