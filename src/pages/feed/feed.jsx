import React, { useState } from "react";
import ordersFeedStyles from "./feed.module.css";
import {
  EmailInput,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Orders from "../../components/orders/orders.jsx";



// Страница ленты заказов
export const OrdersFeed = () => { 

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Достаю из стора заказы всех покупателей (ленту заказов) с флагами
  const { allOrders, total, totalToday } = useSelector(
    (state) => state.ordersFeedState
  );


  
  // Получаю все заказы со статусом "готово"
  const readyOrderNumbersArray = [];

  const getReadyOrderNumbersArray = (allOrders) => {
    allOrders.map((order) => {
      if (order.status === "done") {
        readyOrderNumbersArray.push(order.number);
      }
    })
    return readyOrderNumbersArray;
  }

  const readyOrderNumbers = getReadyOrderNumbersArray(allOrders);



// Получаю все заказы со статусом "в работе"
  const pendingOrderNumbersArray = [];
  
  const getPendingOrderNumbersArray = (allOrders) => {
    allOrders.map((order) => {
      if (order.status === "pending") {
        pendingOrderNumbersArray.push(order.number);
      }
    })
    return pendingOrderNumbersArray;
  }

  const pendingOrderNumbers = getPendingOrderNumbersArray(allOrders);



  return (
    <div className={ordersFeedStyles.container}>
      <h1 className={`${ordersFeedStyles.heading} text text_type_main-large`}>Лента заказов</h1>
      <div className={ordersFeedStyles.feedContainer}>
        <section className={ordersFeedStyles.orderCardsContainer}>
           <Orders />
        </section>
        <section className={ordersFeedStyles.feedStatistic}>
          <div className={ordersFeedStyles.currentCountContainer}>
            <div className={ordersFeedStyles.listOrdersReady}>
              <h2 className={`${ordersFeedStyles.feedStatisticTitle} text text_type_main-medium`}>Готовы:</h2>
              <div className={`${ordersFeedStyles.numbersBox} mt-6`}>
              { // Беру массив всех номеров готовых заказов
                readyOrderNumbers.map((oneReadyOrderNumber) => {
                // прохожу по нему в цикле, по очереди беру каждый номер заказа,
                // чтобы отрендерить его в строке
                  return (
                    <p className={`${ordersFeedStyles.numbersReady} text text_type_digits-default mb-2`}>{oneReadyOrderNumber}</p>
                  )            
                })
              }
              </div>
            </div>
            <div className={ordersFeedStyles.listOrdersInProgress}>
              <h2 className={`${ordersFeedStyles.feedStatisticTitle} text text_type_main-medium`}>В работе:</h2>
              <div className={`${ordersFeedStyles.numbersBox} mt-6`}>
              { // Беру массив всех номеров заказов "в работе"
                pendingOrderNumbers.map((onePendingOrderNumber) => {
                // прохожу по нему в цикле, по очереди беру каждый номер заказа,
                // чтобы отрендерить его в строке
                  return (
                    <p className={`${ordersFeedStyles.numbersPending} text text_type_digits-default mb-2`}>{onePendingOrderNumber}</p>
                  )            
                })
              }
              </div>
            </div>
          </div>
          <div className={ordersFeedStyles.ordersCounts}>
            <div className={ordersFeedStyles.ordersCountTotal}>
              <h2 className={`${ordersFeedStyles.feedStatisticTitle} text text_type_main-medium`}>Выполнено за все время:</h2>
              <p className="text text_type_digits-large">{total}</p>
            </div>
            <div className={ordersFeedStyles.ordersCountToday}>
              <h2 className={`${ordersFeedStyles.feedStatisticTitle} text text_type_main-medium`}>Выполнено за сегодня:</h2>
              <p className="text text_type_digits-large">{totalToday}</p>
            </div>
          </div>
        </section>
      </div>


    </div>
  )
}

export default OrdersFeed;