import ingredientDetailsStyles from "./ingredient-details.module.css";
import { useSelector } from 'react-redux';

const IngredientDetails = () => {

  const ingredientDetails = useSelector(state => state.ingredientDetailsState);


  return (
    <article className={ingredientDetailsStyles.container}>
      <h2 className={`${ingredientDetailsStyles.heading} text text_type_main-large`}>
        Детали ингредиента
      </h2>
      <img className={`${ingredientDetailsStyles.image} mb-4`} src={ingredientDetails.imageLarge} />
      <h3 className={`${ingredientDetailsStyles.title} text text_type_main-medium mb-8`}>
        {ingredientDetails.name}
      </h3>
      <div className={ingredientDetailsStyles.description}>
        <div className={ingredientDetailsStyles.quality}>
          <p className={`${ingredientDetailsStyles.measurementUnit} text text_type_main-default`}>
            Калории,ккал
          </p>
          <p className={`${ingredientDetailsStyles.amount} text text_type_digits-default`}>
            {ingredientDetails.calories}
          </p>
        </div>
        <div className={ingredientDetailsStyles.quality}>
          <p className={`${ingredientDetailsStyles.measurementUnit} text text_type_main-default`}>
            Белки, г
          </p>
          <p className={`${ingredientDetailsStyles.amount} text text_type_digits-default`}>
            {ingredientDetails.proteins}
          </p>
        </div>
        <div className={ingredientDetailsStyles.quality}>
          <p className={`${ingredientDetailsStyles.measurementUnit} text text_type_main-default`}>
            Жиры, г
          </p>
          <p className={`${ingredientDetailsStyles.amount} text text_type_digits-default`}>
            {ingredientDetails.fat}
          </p>
        </div>
        <div className={ingredientDetailsStyles.quality}>
          <p className={`${ingredientDetailsStyles.measurementUnit} text text_type_main-default`}>
            Углеводы, г
          </p>
          <p className={`${ingredientDetailsStyles.amount} text text_type_digits-default`}>
            {ingredientDetails.carbohydrates}
          </p>
        </div>
      </div>
    </article>
  )
}


export default IngredientDetails;