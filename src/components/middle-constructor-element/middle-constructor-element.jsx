import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import constructorStyles from "../burger-constructor/burger-constructor.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { deleteIngredient } from '../../services/actions/ingredientsActions.js';







export const MiddleConstructorElement = ({ element, }) => {

  const dispatch = useDispatch();

  return (
    <li className={`${constructorStyles.transposableElement} mt-4`}>
    <DragIcon type="primary" />
    <ConstructorElement 
      text={element.name}
      price={element.price}
      thumbnail={element.image}
      // НАСТРОИЛА УДАЛЕНИЕ ТОЛЬКО ОДНОГО ИНГР-ТА - ПО ЕГО _id.
      // А НАДО НАСТРОИТЬ УДАЛЕНИЕ ВСЕХ ИНГРЕДИЕНТОВ, ТО ЕСТЬ
      // ПЕРЕДАВАТЬ ТУТ С ЭКШЕН-КРИЕЙТОРОМ НЕ _ID, А КЛЮЧ UUID
      handleClose={() => dispatch(deleteIngredient(element.key))} 
    />
  </li>
  )
}