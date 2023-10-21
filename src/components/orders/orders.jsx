import React, { useRef } from "react";
import ordersStyles from "./orders.module.css";
import { useSelector, useDispatch } from "react-redux";
import OrderCard from "../order-card/order-card.jsx";


const Orders = () => {
  const dispatch = useDispatch();



  return (
    <section className={`${ordersStyles.ordersWrapper} custom-scroll`}>
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />



{/* Динамически это будет рендериться как-то так: 

    <ul className={`${ordersStyles.ordersList} mb-4`}>
      {orderCards.map((orderCard) => (
        <OrderCard key={orderCard.number} />
      ))}
    </ul>

*/}

      
    </section>
  );
};

export default Orders;

{/* Модалка должна открываться не из этого компонента, 
// а при попадании на динамические маршруты заказов */}