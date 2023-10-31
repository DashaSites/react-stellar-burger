import React, { useRef, useEffect } from "react";
import ordersStyles from "./orders.module.css";
import { useSelector, useDispatch } from "react-redux";
import OrderCard from "../order-card/order-card.jsx";
import OrderFullInfo from "../order-full-info/order-full-info.jsx";
import { LOAD_ALL_ORDERS_SUCCESS } from "../../services/actions/ordersFeedActions.js";
import { select } from "../../services/store/store.js";
import { ingredientSelector } from "../../services/selector/ingredientsSelectors.js";
import { useMatch } from "react-router-dom";
import { LOAD_USER_ORDERS_SUCCESS } from "../../services/actions/ordersHistoryActions.js";



// Внутри компонента Orders надо с помощью useMatch проверить:
// Если он открыт со страницы /profile/orders, то тогда он сам делает подключение к вебсокету, только здесь уже при этом добавляется токен.
// То есть всего в проекте 2 подключения к вебсокету.



const Orders = () => {
  const dispatch = useDispatch();

  const isFeed = useMatch("/feed");
  const isProfileOrders = useMatch("/profile/orders");

    // Достаю из стора заказы всех покупателей (ленту заказов) с флагами
    const { allOrders, areAllOrdersLoading, isErrorWithAllOrders } = useSelector(
      (state) => state.ordersFeedState
    );





    
/*
  // Подключаюсь к вебсокету, в зависимости от того, какая открыта страница
  useEffect(() => {

    if (isFeed) {
      const ws = new WebSocket('wss://norma.nomoreparties.space/orders/all');

      ws.onopen = () => {
        console.log('ws opened on browser')
        ws.send('hello world')
      }

      // загружаю с сервера все заказы к себе в ленту заказов
      ws.onmessage = (message) => {
        const parsedData = JSON.parse(message.data);

        dispatch({
          type: LOAD_ALL_ORDERS_SUCCESS, 
          payload: parsedData
        })
      }
    } else if (isProfileOrders) {
      const accessToken = localStorage.getItem("accessToken");
      const accessTokenNumber = accessToken.split(" ")[1]
      const wsUser = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${accessTokenNumber}`);

      wsUser.onopen = () => {
        console.log('wsUser opened on browser')
        wsUser.send('hello Dasha')
      }

            // загружаю с сервера все заказы к себе в ленту заказов
            wsUser.onmessage = (message) => {
              const parsedData = JSON.parse(message.data);
      
              dispatch({
                type: LOAD_ALL_ORDERS_SUCCESS, 
                payload: parsedData
              })
            }
    }

  }, []);

*/


  return (
    <section className={`${ordersStyles.ordersWrapper} custom-scroll`}>
    { 
      allOrders.map((order) => {
        return <OrderCard orderNumber={order.number} title={order.name} time={order.createdAt} ingredients={order.ingredients} />
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