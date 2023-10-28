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
                <p className={`${ordersFeedStyles.numbersReady} text text_type_digits-default mb-2`}>034533</p>
                <p className={`${ordersFeedStyles.numbersReady} text text_type_digits-default mb-2`}>034532</p>
                <p className={`${ordersFeedStyles.numbersReady} text text_type_digits-default mb-2`}>034530</p>
                <p className={`${ordersFeedStyles.numbersReady} text text_type_digits-default mb-2`}>034527</p>
                <p className={`${ordersFeedStyles.numbersReady} text text_type_digits-default mb-2`}>034525</p>
              </div>
            </div>
            <div className={ordersFeedStyles.listOrdersInProgress}>
              <h2 className={`${ordersFeedStyles.feedStatisticTitle} text text_type_main-medium`}>В работе:</h2>
              <div className={`${ordersFeedStyles.numbersBox} mt-6`}>
                <p className="text text_type_digits-default mb-2">034538</p>
                <p className="text text_type_digits-default mb-2">034541</p>
                <p className="text text_type_digits-default mb-2">034542</p>
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