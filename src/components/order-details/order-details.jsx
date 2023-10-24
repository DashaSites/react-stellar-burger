import React, { useState } from "react";
import orderDetailsStyles from "./order-details.module.css";
import OrderFullInfo from "../order-full-info/order-full-info.jsx";



export const OrderDetails = () => { 


  return (
    <div className={orderDetailsStyles.container}>
      <OrderFullInfo />
    </div>
  )

  {/* Добавить условие: иф из лоадинг - ретерн Прелоадер */}
}

export default OrderDetails;