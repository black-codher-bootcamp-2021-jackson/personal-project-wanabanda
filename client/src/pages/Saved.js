import React from "react";
import Recipe from "../components/Recipe";

const Saved = (props) => {
  return (
    <div className="s">
      {props.saved.length === 0 ? (
        <div className="empty">Sorry</div>
      ) : (
        props.saved.map((item) => (
          <Recipe
            key={item.id}
            item={item}
            id={item.dd}
            removeFromSaved={props.removeFromSaved}
          />
        ))
      )}
    </div>
  );
};

export default Saved;
