import React from "react";
import Recipe from "./Recipe";

const Saved = (props) => {
  return (
    <div className="s">
      {props.saved.length === 0 ? (
        <div className="empty">no items in saved</div>
      ) : (
        props.saved.map((item) => (
          <Recipe
            className="r"
            key={item.id}
            item={item}
            img={item.image}
            removeFromSaved={props.removeFromSaved}
          />
        ))
      )}
    </div>
  );
};

export default Saved;
