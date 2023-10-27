import React, { useRef, useEffect } from "react";
import ordersStyles from "./orders.module.css";
import { useSelector, useDispatch } from "react-redux";
import OrderCard from "../order-card/order-card.jsx";
import OrderFullInfo from "../order-full-info/order-full-info.jsx";
import { LOAD_ALL_ORDERS_SUCCESS } from "../../services/actions/ordersFeedActions.js";

const orders = [
 {
  number: 7777,
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

// Внутри компонента Orders надо с помощью useMatch проверить:
// Если он открыт со страницы /profile/orders, то тогда он сам делает подключение к вебсокету, только здесь уже при этом добавляется токен.
// То есть всего в проекте 2 подключения к вебсокету.



const Orders = () => {
  const dispatch = useDispatch();

    // Достаю из стора заказы всех покупателей (ленту заказов) с флагами
    const { allOrders, areAllOrdersLoading, isErrorWithAllOrders } = useSelector(
      (state) => state.ordersFeedState
    );


  useEffect(() => {
    dispatch({
      type: LOAD_ALL_ORDERS_SUCCESS, 
      payload: orders
    })
  }, []);


console.log(allOrders)
  return (
    <section className={`${ordersStyles.ordersWrapper} custom-scroll`}>
    { 
      allOrders.map((order) => {
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