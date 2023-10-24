import React, { useRef } from "react";
import ordersStyles from "./orders.module.css";
import { useSelector, useDispatch } from "react-redux";
import OrderCard from "../order-card/order-card.jsx";
import OrderFullInfo from "../order-full-info/order-full-info.jsx";

const orders = [
 {
  number: 34535,
  title: "Death Star Starship Main бургер",
  counter: 340
 },
 {
  number: 33333,
  title: "Cat",
  counter: 456
 },
 {
  number: 34535,
  title: "Dog",
  counter: 5955
 },
 {
  number: 34535,
  title: "Horse",
  counter: 340
 }
]



const Orders = () => {
  const dispatch = useDispatch();


console.log(orders)
  return (
    <section className={`${ordersStyles.ordersWrapper} custom-scroll`}>
    { 
      orders.map((order) => {
        return <OrderCard orderNumber={order.number} title={order.title} counter={order.counter} />
      })
  }
 



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