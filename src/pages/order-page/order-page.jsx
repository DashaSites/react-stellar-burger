import React, { useState } from "react";
import orderPageStyles from "./order-page.module.css";
import OrderFullInfo from "../../components/order-full-info/order-full-info.jsx";



// Страница авторизации
export const OrderPage = () => { 


  return (
    <div className={orderPageStyles.container}>
      <OrderFullInfo />
    </div>
  )
}

export default OrderPage;