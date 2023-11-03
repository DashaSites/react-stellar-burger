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
import { ingredientSelector, orderPriceSelector } from "../../services/selector/ingredientsSelectors.js";


const OrderCard = ({ orderNumber, title, time, ingredients }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  // хук useResolvedPath возвращает объект данных, 
  // в котором с помощью pathname можно получить текущий путь в адресной строке:
  const match = useResolvedPath("").pathname;
  console.log(match);

  const matchFeed = useMatch("/feed");
  const matchProfileOrders = useMatch("/profile/orders");

  ///// ПРОВЕРКА ВАЛИДНОСТИ ЗАКАЗОВ (ЧТОБЫ НЕВАЛИДНЫЕ НЕ ОТРИСОВЫВАТЬ)
  //const areEnoughIngredients = ingredients.length >= 3;


  
// ГДЕ-ТО ЗДЕСЬ НИЖЕ БЫЛА ОШИБКА. ЧТО ЗА ХРЕНЬ?!
  const ingredientsInOrder = ingredients.map((ingredientId) => {

    const ingredient = select(ingredientSelector(ingredientId));
    return ingredient;
  });


  const ingredientsIdsInOrder = ingredientsInOrder.map((ingredient) => {
    return ingredient._id;
  })

  const orderPrice = select(orderPriceSelector(ingredientsIdsInOrder));



  // Выявить, есть ли в массиве типов элементов заказа (ingredientsInOrderTypes) две булки
  // Если есть две булки, то такой заказ валидный

  // Проверить, чтобы в списке идентификаторов ингредиентов не было null
  // Если приходит какая-нибудь такая фигня, то карточку с этим заказом не отрисовывать:
  // Что вообще пришли заказы,
  // Что они не нулевые,
  // Что в каждом заказе не андифайнд
  // Что он не нулевой
  // Что в нем есть ингредиенты
  // Что айдишники не нулевые 

  /*
  if (!orders) {
    <div>
    <p>Загрузка...</p>
  </div>
  }



   if (
    orders === null ||
    orders === undefined ||
    orders.length === 0 
  ) {
    return (
      <div>
        <p>Заказов пока нет</p>
      </div>
    )
  }

  order !== undefined && 
  order !== null && 
  order.ingredients !== null 
  && order.ingredients !== undefined 
  && order.ingredients.length >= 3
*/




  
  
 


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
              <OrderCardIngredients ingredients={ingredients} />
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
              <OrderCardIngredients ingredients={ingredients} />
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
  );
};

export default OrderCard;



{/*
<Link
// Тут мы формируем динамический путь для нашего заказа

// !!! ПРИДУМАТЬ, КАК ЗДЕСЬ НАПИСАТЬ РАЗВИЛКУ, -- c использованием location или match! 
// ЧТОБЫ С profile/orders ДИНАМИЧЕСКИЙ ПУТЬ БЫЛ ДРУГОЙ!!!
to={`/feed/${orderNumber}`}
// а также сохраняем в свойство background роут,
// на котором была открыта наша модалка
state={{ background: location }}
className={orderCardStyles.link}
>
<section className={orderCardStyles.section}>
  <div className={orderCardStyles.container}>
    <div className={`${orderCardStyles.numberAndDate} mb-6`}>
      <p className="text text_type_digits-default">{orderNumber}</p>
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
</Link>
*/}