import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import OrderPreloader from "../order-preloader/order-preloader.jsx";
import Orders from "../orders/orders.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_USERS_ORDERS_WS_CONNECT,
  LOAD_USERS_ORDERS_WS_DISCONNECT
} from '../../services/actions/socketActions.js';
import { Navigate, useNavigate } from "react-router-dom";


const ProfileOrders = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

    // Достаю из стора заказы всех покупателей (ленту заказов) с флагами
  const { userOrders } = useSelector(
      (state) => state.ordersHistoryState
  );


    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        dispatch({
          type: LOAD_USERS_ORDERS_WS_CONNECT
        })
        return () => {
          dispatch({
            type: LOAD_USERS_ORDERS_WS_DISCONNECT
          })
        }
      } else {
        navigate('/login');
      }
    }, []);

  return (
    <Orders orders={userOrders} />
  )
};


export default ProfileOrders;