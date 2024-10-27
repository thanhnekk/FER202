import React, { useState } from "react";
import "../style/Footer.css";

const Footer = () => {
  const [isOpen, setIsOpen] = useState({
    office: false,
    contact: false,
    policies: false,
  });

  const toggleSection = (section) => {
    setIsOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h6 onClick={() => toggleSection("office")} className="footer-title">
            Văn Phòng
            <span className="dropdown-icon">
              {isOpen.office ? (
                <i className="bi bi-chevron-up"></i>
              ) : (
                <i className="bi bi-chevron-down"></i>
              )}
            </span>
          </h6>
          <ul className={`footer-list ${isOpen.office ? "show" : ""}`}>
            <li>CÔNG TY TNHH 2 THÀNH VIÊN</li>
            <li>Trụ sở chính: Thạch Thất, Hà Nội</li>
            <li>Số điện thoại: 1234 5678</li>
            <li>Email: thanhna@onlineshop.com</li>
          </ul>
        </div>
        <div>
          <h6
            onClick={() => toggleSection("policies")}
            className="footer-title"
          >
            Chính sách
            <span className="dropdown-icon">
              {isOpen.policies ? (
                <i className="bi bi-chevron-up"></i>
              ) : (
                <i className="bi bi-chevron-down"></i>
              )}
            </span>
          </h6>
          <ul className={`footer-list ${isOpen.policies ? "show" : ""}`}>
            <li>
              <a href="/chinh-sach-ban-hang">Chính sách bán hàng</a>
            </li>
            <li>
              <a href="/chinh-sach-thanh-toan">Chính sách thanh toán</a>
            </li>
            <li>
              <a href="/chinh-sach-van-chuyen">Chính sách vận chuyển</a>
            </li>
            <li>
              <a href="/chinh-sach-doi-tra">Chính sách đổi trả</a>
            </li>
            <li>
              <a href="/chinh-sach-bao-mat">Chính sách bảo mật</a>
            </li>
          </ul>
        </div>
        <div>
          <h6 onClick={() => toggleSection("contact")} className="footer-title">
            Thông tin
            <span className="dropdown-icon">
              {isOpen.contact ? (
                <i className="bi bi-chevron-up"></i>
              ) : (
                <i className="bi bi-chevron-down"></i>
              )}
            </span>
          </h6>
          <ul className={`footer-list ${isOpen.contact ? "show" : ""}`}>
            <li>
              <a href="/ve-chung-toi">Về chúng tôi</a>
            </li>
            <li>
              <a href="/huong-dan-chon-size">Hướng dẫn chọn size</a>
            </li>
            <li>
              <a href="/thong-tin-lien-he">Thông tin liên hệ</a>
            </li>
            <li>
              <a href="/cau-hoi-thuong-gap">Câu hỏi thường gặp</a>
            </li>
            <li>
              <a href="/su-kien">Sự kiện</a>
            </li>
            <li>
              <a href="/tin-tuc">Tin tức</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Công ty TNHH 2 Thành Viên. Power by Thanh
        voi Na
      </div>
    </footer>
  );
};

export default Footer;
