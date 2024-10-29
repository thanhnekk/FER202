// OrderManagement.js
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
    <div className="order-management">
      <h2>Order Management</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order #{order.id} - Status: {order.status}
            <select
              value={order.status}
              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
            >
              <option value="Pending">Pending Payment</option>
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
