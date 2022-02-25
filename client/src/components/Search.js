import React from "react";
import "../style/Search.css";
const Search = (props) => {
  const handelSubmit = (e) => {
    e.preventDefault();
    props.search(props.term);
  };
  return (
    <div className="s">
      <form id="searchAPI" className="s-content" onSubmit={handelSubmit}>
        <input
          className="input"
          id="term"
          type="text"
          value={props.term}
          onChange={(e) => props.setTerm(e.target.value)}
        />
        <button type="submit" className="submitBtn">
          Search
        </button>
      </form>
    </div>
  );
};
export default Search;
