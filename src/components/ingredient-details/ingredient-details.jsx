import ingredientDetailsStyles from "./ingredient-details.module.css";

const IngredientDetails = ({ ingredient }) => {
  return (
    <article className={ingredientDetailsStyles.container}>
      <h2 className={`${ingredientDetailsStyles.heading} text text_type_main-large`}>
        Детали ингредиента
      </h2>
      <div className={ingredientDetailsStyles.image}>
        {ingredient.image}
      </div>
      <h3 className={`${ingredientDetailsStyles.title} text text_type_main-medium`}>
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

export default IngredientDetails;