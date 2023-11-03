import React from "react";
import orderDetailsStyles from "./order-details.module.css";
import OrderFullInfo from "../order-full-info/order-full-info.jsx";



export const OrderDetails = () => { 

  return (
    <div className={orderDetailsStyles.container}>
      <OrderFullInfo />
    </div>
  )
}

export default OrderDetails;