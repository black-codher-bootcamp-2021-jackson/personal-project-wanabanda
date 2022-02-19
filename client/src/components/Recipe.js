import React from "react";

const Recipe = ({ item }) => {
  const { id, title, image } = item;
  return (
    <div>
      <h3>{title}</h3>
      <img alt={title && { id }} src={image}></img>
    </div>
  );
};
export default Recipe;
