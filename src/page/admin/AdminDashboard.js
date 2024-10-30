import React, { useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProductManagement from "../admin/ProductManagement";
import UserManagement from "../admin/UserManagement";
import OrderManagement from "../admin/OrderManagement";
import Header from "../../component/Header";
import Footer from "../../component/Footer";

const AdminDashboard = () => {
  const [key, setKey] = useState("products");
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <Header></Header>
      <h2>Admin Dashboard</h2>
      <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="products" onClick={() => setKey("products")}>
              Manage Products
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="users" onClick={() => setKey("users")}>
              Manage Users
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="orders" onClick={() => setKey("orders")}>
              Manage Orders
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="products">
            <ProductManagement />
          </Tab.Pane>
          <Tab.Pane eventKey="users">
            <UserManagement />
          </Tab.Pane>
          <Tab.Pane eventKey="orders">
            <OrderManagement />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      <Footer></Footer>
    </div>
  );
};

export default AdminDashboard;
