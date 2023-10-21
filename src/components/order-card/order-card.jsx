import React, { useRef } from "react";
import orderCardStyles from "./order-card.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  FormattedDate,
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderCardIngredients from "../../components/order-card-ingredients/order-card-ingredients.jsx";



const OrderCard = ({ number, title, counter }) => {
  const dispatch = useDispatch();

 

  const date = () => {
    const today = new Date()
    return (
      <FormattedDate
        date={
          new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            today.getHours(),
            today.getMinutes() - 1,
            0,
          )
        }
      />
    )
  }



  return (
    <section className={orderCardStyles.section}>
      <div className={orderCardStyles.container}>
        <div className={`${orderCardStyles.numberAndDate} mb-6`}>
          <p className="text text_type_digits-default">{number}</p>
          <span className={`${orderCardStyles.formattedDate} text text_type_main-default`}>{date()}</span>
        </div>
        <p className="text text_type_main-medium mb-6">{title}</p>
        <div className={orderCardStyles.ingredientsAndCounter}>
          <OrderCardIngredients />
          <div className={orderCardStyles.orderCounter}>
            <p className={`${orderCardStyles.counter} text text_type_main-medium`}>{counter}</p>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderCard;