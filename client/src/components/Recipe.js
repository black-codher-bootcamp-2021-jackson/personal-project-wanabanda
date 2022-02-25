import React from "react";
import { Link } from "react-router-dom";
import "../style/Recipes.css";
const Recipe = ({ item, ...props }) => {
  const { id, title, image, servings, instructions } = item;

  return (
    <div className="r">
      <h2 className="title">{title}</h2>
      <p>{servings}</p>
      <img className="image" src={image} alt={title && { id }} />
      <Link className="showDetails" id={instructions} to={`/recipes/${id}`}>
        Instruction
      </Link>
      <p>{instructions}</p>

      <div>
        {props.stored === "library" ? (
          <button className="add-btn" onClick={() => props.addToSaved(id)}>
            ADD
          </button>
        ) : (
          <button
            className="remove-btn"
            onClick={() => props.removeFromSaved(id)}
          >
            x
          </button>
        )}
      </div>
    </div>
  );
}; //Prop Types
export default Recipe;
