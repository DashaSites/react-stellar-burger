import React, { useRef } from "react";
import ordersStyles from "./orders.module.css";
import { useSelector, useDispatch } from "react-redux";
import OrderCard from "../order-card/order-card.jsx";
import OrderFullInfo from "../order-full-info/order-full-info.jsx";



const Orders = () => {
  const dispatch = useDispatch();




  return (
    <section className={`${ordersStyles.ordersWrapper} custom-scroll`}>
      <OrderCard number="#034535" title="Death Star Starship Main бургер" counter="480" />
      <OrderCard number="#034534" title="Interstellar бургер" counter="560" />
      <OrderCard number="#034533" title="Black Hole Singularity острый бургер" counter="510" />
      <OrderCard number="#034532" title="Supernova Infinity бургер" counter="370" />
      <OrderCard number="#034531" title="Interstellar бургер" counter="370" />



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

{/* Модалка на финальном этапе должна открываться не из этого компонента, 
// а при попадании на динамические маршруты заказов */}