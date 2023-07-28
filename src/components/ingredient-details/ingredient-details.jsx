import ingredientDetailsStyles from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import ingredientPropType from "../../utils/prop-types.js";

const IngredientDetails = ({ ingredient }) => {
  return (
    <article className={ingredientDetailsStyles.container}>
      <h2 className={`${ingredientDetailsStyles.heading} text text_type_main-large`}>
        Детали ингредиента
      </h2>
      <img className={`${ingredientDetailsStyles.image} mb-4`} src={ingredient.image} />
      <h3 className={`${ingredientDetailsStyles.title} text text_type_main-medium mb-8`}>
        {ingredient.name}
      </h3>
      <div className={ingredientDetailsStyles.description}>
        <div className={ingredientDetailsStyles.quality}>
          <p className={`${ingredientDetailsStyles.measurementUnit} text text_type_main-default`}>
            Калории,ккал
          </p>
          <p className={`${ingredientDetailsStyles.amount} text text_type_digits-default`}>
            {ingredient.calories}
          </p>
        </div>
        <div className={ingredientDetailsStyles.quality}>
          <p className={`${ingredientDetailsStyles.measurementUnit} text text_type_main-default`}>
            Белки, г
          </p>
          <p className={`${ingredientDetailsStyles.amount} text text_type_digits-default`}>
            {ingredient.proteins}
          </p>
        </div>
        <div className={ingredientDetailsStyles.quality}>
          <p className={`${ingredientDetailsStyles.measurementUnit} text text_type_main-default`}>
            Жиры, г
          </p>
          <p className={`${ingredientDetailsStyles.amount} text text_type_digits-default`}>
            {ingredient.fat}
          </p>
        </div>
        <div className={ingredientDetailsStyles.quality}>
          <p className={`${ingredientDetailsStyles.measurementUnit} text text_type_main-default`}>
            Углеводы, г
          </p>
          <p className={`${ingredientDetailsStyles.amount} text text_type_digits-default`}>
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </article>
  )
}


IngredientDetails.propTypes = {
  ingredient: ingredientPropType.isRequired
}


export default IngredientDetails;