import React from "react";
import ordersStyles from "./orders.module.css";
import OrderCard from "../order-card/order-card.jsx";
import { LOAD_ALL_ORDERS_SUCCESS } from "../../services/actions/ordersFeedActions.js";
import { select } from "../../services/store/store.js";
import { ingredientSelector } from "../../services/selector/ingredientsSelectors.js";
import { LOAD_USER_ORDERS_SUCCESS } from "../../services/actions/ordersHistoryActions.js";
import OrderPreloader from "../../components/order-preloader/order-preloader.jsx";



// Внутри компонента Orders надо с помощью useMatch проверить:
// Если он открыт со страницы /profile/orders, то тогда он сам делает подключение к вебсокету, только здесь уже при этом добавляется токен.
// То есть всего в проекте 2 подключения к вебсокету.



const Orders = ({ orders }) => {


  return (
      !orders ? <OrderPreloader /> : (
        <section className={`${ordersStyles.ordersWrapper} custom-scroll`}>
        { 
          orders.map((order) => {
            return <OrderCard orderNumber={order.number} title={order.name} time={order.createdAt} ingredientsIds={order.ingredients} />
          })
        }
        </section>
      )
  );
};

export default Orders;