import React from "react";
import orderCardStyles from "./order-card.module.css";
import { useDispatch } from "react-redux";
import {
  FormattedDate, 
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderCardIngredients from "../../components/order-card-ingredients/order-card-ingredients.jsx";
import { useLocation, Link, useResolvedPath, useMatch } from 'react-router-dom';
import { select } from "../../services/store/store.js";
import { orderPriceSelector } from "../../services/selector/ingredientsSelectors.js";


const OrderCard = ({ orderNumber, title, time, ingredientsIds }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  // хук useResolvedPath возвращает объект данных, 
  // в котором с помощью pathname можно получить текущий путь в адресной строке:
  const match = useResolvedPath("").pathname;

  const matchFeed = useMatch("/feed");
  const matchProfileOrders = useMatch("/profile/orders");
  
  // Высчитываю стоимость заказа

  const orderPrice = select(orderPriceSelector(ingredientsIds));


  // Если заказ не проходит проверку на валидность, возвращаю null
  const isNoNullIngredient = (ingredients) => {
    const boolsArray = ingredients.map((ingredient) => ingredient != null);
    return !boolsArray.includes(false);
  }


  const checkOrderValidity = (orderNumberFromServer, titleFromServer, ingredientsInOrder) => {
    return (
      orderNumberFromServer !== null &&
      orderNumberFromServer !== undefined &&
      titleFromServer !== null &&
      titleFromServer !== undefined &&
      ingredientsInOrder !== null &&
      ingredientsInOrder !== undefined &&
      isNoNullIngredient(ingredientsIds)
    )
  }

  const isCheckOrderValitityPassed = checkOrderValidity(orderNumber, title, ingredientsIds);

  if (!isCheckOrderValitityPassed) {
    return null;
  }


  return (
    <>
    {matchFeed && (
      <Link
      // Тут мы формируем динамический путь для нашего заказа
        to={`/feed/${orderNumber}`}
      // а также сохраняем в свойство background роут,
      // на котором была открыта наша модалка
        state={{ background: location }}
        className={orderCardStyles.link}
      >
        <section className={orderCardStyles.section}>
        <div className={orderCardStyles.container}>
          <div className={`${orderCardStyles.numberAndDate} mb-6`}>
            <p className="text text_type_digits-default">#{orderNumber}</p>
            <FormattedDate date={new Date(time)} className={`${orderCardStyles.formattedDate} text text_type_main-default`} />
          </div>
          <p className="text text_type_main-medium mb-6">{title}</p>
          <div className={orderCardStyles.ingredientsAndCounter}>
            <OrderCardIngredients ingredients={ingredientsIds} />
            <div className={orderCardStyles.orderCounter}>
              <p className={`${orderCardStyles.counter} text text_type_main-medium`}>{orderPrice}</p>
              <CurrencyIcon type="primary"/>
            </div>
          </div>
        </div>
      </section>
    </Link>
    )}

    {matchProfileOrders && (
      <Link
      // Тут мы формируем динамический путь для нашего заказа
        to={`/profile/orders/${orderNumber}`}
      // а также сохраняем в свойство background роут,
      // на котором была открыта наша модалка
        state={{ background: location }}
        className={orderCardStyles.link}
      >
        <section className={orderCardStyles.section}>
        <div className={orderCardStyles.container}>
          <div className={`${orderCardStyles.numberAndDate} mb-6`}>
            <p className="text text_type_digits-default">{orderNumber}</p>
            <FormattedDate date={new Date(time)} className={`${orderCardStyles.formattedDate} text text_type_main-default`} />
          </div>
          <p className="text text_type_main-medium mb-6">{title}</p>
          <div className={orderCardStyles.ingredientsAndCounter}>
            <OrderCardIngredients ingredients={ingredientsIds} />
            <div className={orderCardStyles.orderCounter}>
              <p className={`${orderCardStyles.counter} text text_type_main-medium`}>{orderPrice}</p>
              <CurrencyIcon type="primary"/>
            </div>
          </div>
        </div>
      </section>
    </Link>
    )}
  </>
  )
};

export default OrderCard;