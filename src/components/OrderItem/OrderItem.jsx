import React from "react";
import './OrderItem.css';

const OrderItem = ({order}) => {
  return (
    <li className="order">
        <p className="order__id">ID: {order.id}</p>
        <p className="order__title">{order.product}</p>
        <p className="order__price">Price: {order.price}</p>
        <p className="order__brand">Brand {order.brand}</p>
    </li>
  )
};

export default OrderItem;
