import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, Offcanvas, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from "../logo.png";
const Header = ({ categories }) => {
  const [show, setShow] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggleProducts = () => setShowProducts(!showProducts);

  return (
    <>
      <header
        className="header d-flex align-items-center p-3 shadow-sm container-fluid"
        style={{
          backgroundColor: "#fff",
          borderBottom: "2px solid #ddd",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Button className="d-lg-none" variant="light" onClick={handleShow}>
          <i className="bi bi-list" style={{ fontSize: "1.5rem" }}></i>
        </Button>

        {/* Logo */}
        <div className="logo mx-auto">
          <img
            src={logo}
            alt="Logo"
            style={{ height: "50px", width: "150px", cursor: "pointer" }}
          />
        </div>

        {/* Menu (Desktop) */}
        <div className="menu d-flex align-items-center d-none d-lg-flex mx-auto">
          <ul
            className="list-unstyled d-flex m-0"
            style={{
              gap: "30px",
              fontSize: "1rem",
              fontWeight: "500",
            }}
          >
            <li style={{ cursor: "pointer" }}>Hàng mới về</li>
            <li>
              <a
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "black",
                }}
                href="/"
              >
                Home
              </a>
            </li>
            <li className="d-flex align-items-center">
              <a
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "black",
                }}
                href="/products/all"
              >
                Sản phẩm
              </a>
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    fontWeight: "500",
                    cursor: "pointer",
                    padding: "0",
                  }}
                ></Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-category">
                  {categories.map((th, i) => (
                    <Dropdown.Item href="#" key={i}>
                      {th.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li style={{ cursor: "pointer" }}>Sale</li>
          </ul>
        </div>

        {/* Search Box */}
        <div className="searchbox d-none d-md-flex align-items-center mx-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm sản phẩm..."
            style={{
              width: "200px",
              borderRadius: "20px",
              padding: "0.375rem 0.75rem",
              marginRight: "10px",
            }}
          />
          <i
            className="bi bi-search"
            style={{ cursor: "pointer", fontSize: "1.5rem" }}
          ></i>
        </div>

        {/* Account and Cart */}
        <div className="account-cart d-flex align-items-center ms-auto">
          <span
            className="d-flex align-items-center me-3"
            style={{ cursor: "pointer", fontSize: "1.5rem" }}
          >
            <i className="bi bi-person"></i>
          </span>
          <span
            className="d-flex align-items-center"
            style={{ cursor: "pointer", fontSize: "1.5rem" }}
          >
            <i className="bi bi-cart"></i>
          </span>
        </div>
      </header>

      {/* Sidebar (Offcanvas) */}
      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="list-unstyled">
            <li style={{ cursor: "pointer" }}>Hàng mới về</li>
            <li style={{ cursor: "pointer" }}>Home</li>
            <li className="d-flex" style={{ flexDirection: "column" }}>
              <div>
                Sản phẩm
                <span style={{ cursor: "pointer" }} onClick={toggleProducts}>
                  {showProducts ? (
                    <i className="bi bi-dash"></i>
                  ) : (
                    <i className="bi bi-plus"></i>
                  )}
                </span>
              </div>
              {showProducts && (
                <ul className="list-unstyled ms-3">
                  {categories.map((th, i) => (
                    <li href="#" key={i} style={{ cursor: "pointer" }}>
                      {th.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li style={{ cursor: "pointer" }}>Sale</li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Header;
