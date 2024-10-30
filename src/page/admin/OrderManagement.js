import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9999/orders").then((res) => {
      setOrders(res.data);
    });
  }, []);

  const updateOrderStatus = (id, status) => {
    const updatedOrder = orders.find((order) => order.id === id);
    updatedOrder.status = status;
    axios.put(`http://localhost:9999/orders/${id}`, updatedOrder).then(() => {
      setOrders(
        orders.map((order) => (order.id === id ? updatedOrder : order))
      );
    });
  };

  return (
    <div
      className="container"
      style={{
        margin: "auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          color: "#333",
          fontSize: "1.8em",
          marginBottom: "20px",
          textAlign: "center",
          fontWeight: "600",
        }}
      >
        Order Management
      </h2>
      <ul style={{ listStyleType: "none", padding: "0" }}>
        {orders.map((order) => (
          <li
            key={order.id}
            style={{
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <h3
              style={{ color: "#555", fontSize: "1.4em", marginBottom: "10px" }}
            >
              Order #{order.id}
            </h3>
            <p style={{ fontSize: "0.9em", color: "#666", margin: "5px 0" }}>
              <strong style={{ fontWeight: "bold", color: "#444" }}>
                Status:
              </strong>{" "}
              {order.status}
            </p>
            <p style={{ fontSize: "0.9em", color: "#666", margin: "5px 0" }}>
              <strong style={{ fontWeight: "bold", color: "#444" }}>
                Address:
              </strong>{" "}
              {order.address}
            </p>
            <p style={{ fontSize: "0.9em", color: "#666", margin: "5px 0" }}>
              <strong style={{ fontWeight: "bold", color: "#444" }}>
                Date:
              </strong>{" "}
              {order.date}
            </p>
            <p style={{ fontSize: "0.9em", color: "#666", margin: "5px 0" }}>
              <strong style={{ fontWeight: "bold", color: "#444" }}>
                Payment Method:
              </strong>{" "}
              {order.paymentMethod}
            </p>
            <p style={{ fontSize: "0.9em", color: "#666", margin: "5px 0" }}>
              <strong style={{ fontWeight: "bold", color: "#444" }}>
                Total Amount:
              </strong>{" "}
              {order.totalAmount} VND
            </p>
            <p style={{ fontSize: "0.9em", color: "#666", margin: "5px 0" }}>
              <strong style={{ fontWeight: "bold", color: "#444" }}>
                Shipping Fee:
              </strong>{" "}
              {order.shippingFee} VND
            </p>
            <p style={{ fontSize: "0.9em", color: "#666", margin: "5px 0" }}>
              <strong style={{ fontWeight: "bold", color: "#444" }}>
                Grand Total:
              </strong>{" "}
              {order.grandTotal} VND
            </p>
            <h4 style={{ fontSize: "1.1em", color: "#444", margin: "10px 0" }}>
              Items:
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {order.items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    margin: "0 10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    width="50"
                    style={{ marginRight: "8px", borderRadius: "4px" }}
                  />
                  <p style={{ margin: 0 }}>
                    {item.name} (x{item.quantity})
                  </p>
                </div>
              ))}
            </div>
            <select
              value={order.status}
              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
              style={{
                marginTop: "10px",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                backgroundColor: "#f1f1f1",
              }}
            >
              <option value="Pending Payment">Pending Payment</option>
              <option value="Awaiting Pickup">Awaiting Pickup</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Completed">Completed</option>
              <option value="Refund Requested">Refund Requested</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderManagement;
