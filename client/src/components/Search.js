import React from "react";

const Search = (props) => {
  const handelSubmit = (e) => {
    e.preventDefault();
    props.findRecipes(props.searchRecipes);
  };
  return (
    <form id="searchAPI" className="s" onSubmit={handelSubmit}>
      <input
        type="text"
        id="searchApiInput"
        value={props.searchRecipes}
        onChange={(e) => props.setSearchRecipes(e.target.value)}
      />
      <button type="submit" className="submitBtn">
        Search
      </button>
    </form>
  );
};
export default Search;
