import React from "react";

const Search = (props) => {
  const handelSubmit = (e) => {
    e.preventDefault();
    props.search(props.term);
  };
  return (
    <form id="searchAPI" className="s" onSubmit={handelSubmit}>
      <input
        id="term"
        type="text"
        value={props.term}
        onChange={(e) => props.setTerm(e.target.value)}
      />
      <button type="submit" className="searchsubmitBtn">
        Search
      </button>
    </form>
  );
};
export default Search;
