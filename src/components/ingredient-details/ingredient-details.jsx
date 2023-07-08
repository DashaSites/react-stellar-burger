import ingredientDetailsStyles from "./ingredient-details.module.css";
import PropTypes from "prop-types";

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
  ingredient: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
  }).isRequired
}


export default IngredientDetails;