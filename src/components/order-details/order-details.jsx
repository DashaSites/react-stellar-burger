import React, { useContext } from "react";
import orderDetailsStyles from "./order-details.module.css";
import iconDone from "../../images/done.svg";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';
//import { OrderNumberContext } from '../../services/appContext.js';


const OrderDetails = () => {

  //const { orderNumber } = useContext(OrderNumberContext);
  const { orderNumber } = useSelector(state => state.orderDetailsState.orderNumber);


  return (
    <article className={orderDetailsStyles.container}>
      <h2 className={`${orderDetailsStyles.number} text text_type_digits-large mb-8`}>{orderNumber}</h2>
      <h3 className="text text_type_main-medium mb-15">идентификатор заказа</h3>
      <img src={iconDone} className="mb-15" />
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className={`${orderDetailsStyles.recommendation} text text_type_main-default`}>Дождитесь готовности на орбитальной станции</p>
    </article>
  )
}


//OrderDetails.propTypes = {
//  orderNumber: PropTypes.number.isRequired
//}


export default OrderDetails;