import React, { useEffect } from "react";
import orderInfoStyles from "./order-full-info.module.css";
import { useParams } from 'react-router-dom';
import { orderSelector } from "../../services/selector/ordersSelectors.js";
import { select } from "../../services/store/store.js";
import { ingredientSelector, orderPriceSelector } from "../../services/selector/ingredientsSelectors.js";
import { useDispatch, useSelector } from "react-redux";
import {
  CurrencyIcon,
  FormattedDate
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderPreloader from "../order-preloader/order-preloader.jsx";
import { LOAD_ALL_ORDERS_WS_CONNECT, LOAD_ALL_ORDERS_WS_DISCONNECT } from "../../services/actions/socketActions.js";
import { getFetchedFullOrderDetails } from "../../services/actions/orderDetailsActions.js";



const OrderFullInfo = () => {

  const dispatch = useDispatch();

  const { orderNumber } = useParams();



  // КЛИКНУТЫЙ ЗАКАЗ
  // Беру детали заказа из стора: вытаскиваю их через селектор, 
  // который по номеру заказа через ordersFeedReducer возвращает заказ целиком
  // ВИДИМО, ПРОБЛЕМА В ТОМ, ЧТО ЧЕРЕЗ orderFeedReducer НАХОДЯТСЯ ТОЛЬКО ПАРА ПОСЛЕДНИХ
  

  // ТАК ОТКРЫВАЮТСЯ ТОЛЬКО ПОСЛЕДНИЕ ТРИ ЗАКАЗА
  const order = useSelector(orderSelector(orderNumber)); 

  /* // НО ВСЕ РАВНО ТАК ПОКА НЕ ОТКРЫВАЕТСЯ НИ ОДИН ЗАКАЗ
  const order = useSelector(
    (state) => state.fullOrderFoundByNumberState.order
  );
  */
  
  // МОЖЕТ, АЙДИ НАДО ПРИВЕСТИ К СТРОКЕ/ЧИСЛУ
  const orderIngredients = order?.ingredients.map((ingredientId) => {
    const orderIngredient = select(ingredientSelector(ingredientId));
    return orderIngredient;
  }) ?? []
 
/*
  const orderIngredients = order?.ingredients.map((ingredientId) => {
    const orderIngredient = select(ingredientSelector(ingredientId));
    return orderIngredient;
  }) ?? []
*/

  
  
  const orderIngredientsIds =  orderIngredients.map((item) => {
    return item._id;
  })

  const orderPrice = select(orderPriceSelector(orderIngredientsIds));

    // Диспатчу с сервера заказы из ordersFeed и конкретный кликнутый заказ
    useEffect(() => {

      dispatch(getFetchedFullOrderDetails(orderNumber)); // ПОЛУЧИЛА ИСКОМЫЙ ЗАКАЗ 
      // ОТ АПИ, НО ОН СУКА НЕ ИСПОЛЬЗУЕТСЯ В РЕДЬЮСЕРЕ. ИСПРАВИТЬ ЭТО

      dispatch({
        type: LOAD_ALL_ORDERS_WS_CONNECT
      })
      return () => {
        dispatch({
          type: LOAD_ALL_ORDERS_WS_DISCONNECT
        })
      }
 
    }, [orderNumber]);



  const setOrderStatus = (order) => {
    
    let orderStatus;
    
    if (order.status === "done") {
      orderStatus = "Готово";
    } else if (order.status === "pending") {
      orderStatus = "В работе";
    } else if (order.status === "created") {
      orderStatus = "Создан";
    } else {
      orderStatus = order.status;
    }

    return orderStatus;
  }



  // Получаю массив ингредиентов заказа, выкинув из изначального массива все повторения
  const getOrderIngredientsWithoutDuplicates = (orderIngredients) => {
    let orderIngredientsWithoutDuplicates = []; 

    orderIngredients.filter((ingredient) => {
      if (!orderIngredientsWithoutDuplicates.includes(ingredient)) {
        orderIngredientsWithoutDuplicates.push(ingredient);
      }
      return orderIngredientsWithoutDuplicates;
    })
    return orderIngredientsWithoutDuplicates;
  }

  // "Чистый" (без повторений) массив ингредиентов в заказе
  const cleanIngredientsArray = getOrderIngredientsWithoutDuplicates(orderIngredients);


  
  // Выявляю, сколько раз данный ингредиент встречается в заказе:
    const countIngredient = (ingredient) => {
      const ingredientIdCountInOrder = orderIngredientsIds.filter((id) => {
        return ingredient._id === id;
      })
      return ingredientIdCountInOrder.length;
    }
  


   

  return (
    <>
      {!order ? (
        <OrderPreloader />
      ) : (
        <>
          <article className={orderInfoStyles.container}>
            <p className={`${orderInfoStyles.orderNumber} text text_type_digits-default`}>{`#${orderNumber}`}</p>
            <h2 className={`${orderInfoStyles.orderName} text text_type_main-medium mb-3`}>
              {order.name}
            </h2>
            <p className={`${orderInfoStyles.orderStatus} text text_type_main-default mb-15`}>{setOrderStatus(order)}</p>
            <h2 className="text text_type_main-medium mb-6">
              Состав
            </h2>
            <ul className={`${orderInfoStyles.orderIngredientsList} custom-scroll`}>
              {
                cleanIngredientsArray.map((ingredient, index) => {
                  return (
                    <li key={index}>
                      <div className={orderInfoStyles.orderIngredient}>
                        <img className={orderInfoStyles.ingredientPreview} src={ingredient.image} />
                        <p className={`${orderInfoStyles.ingredientName} text text_type_main-default`}>{ingredient.name}</p>
                          <div className={orderInfoStyles.ingredientCountContainer}>
                            <p className="text text_type_digits-default mr-2"> {countIngredient(ingredient)} x {ingredient.price}</p>
                            <CurrencyIcon />
                          </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>

            <div className={orderInfoStyles.timeAndTotalPriceContainer}>
              <p className={`${orderInfoStyles.orderTime} text text_type_main-default text_color_inactive`}>{order.createdAt}</p>
              <div className={orderInfoStyles.totalPriceContainer}>
                <p className={`${orderInfoStyles.totalPrice} text text_type_digits-default`}>{orderPrice}</p>
                <CurrencyIcon />
              </div>
            </div>
          </article>
        </>
      )
      }
    </>
  );
};

export default OrderFullInfo;