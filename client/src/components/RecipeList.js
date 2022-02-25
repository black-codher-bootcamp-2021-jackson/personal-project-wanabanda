import React from "react";
import PropTypes from "prop-types";
import Recipe from "./Recipe";

const RecipeList = ({ items, ...props }) => {
  return (
    <div className="recipe-list">
      <div>
        {props.stored === "library"}
        {items.length === 0 ? (
          <div className="empty"> </div>
        ) : (
          items
            .filter((item) => props.stored === "saved" || !item.inSaved)
            .map((item) => (
              <Recipe
                className="r"
                key={item.id}
                item={item}
                img={item.image}
                addToSaved={props.addToSaved}
                removeFromSaved={props.removeFromSaved}
                //showRecipes={showRecipes}
                {...props}
              />
            ))
        )}
      </div>
    </div>
  );
};

RecipeList.protoTypes = {
  items: PropTypes.array.isRequired,
};

export default RecipeList;
