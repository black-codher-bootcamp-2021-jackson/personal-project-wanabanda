import React, { useState } from "react";
import Search from "../components/Search";

const API_KEY = process.env.REACT_APP_API_KEY;

const Home = () => {
  const [searchRecipes, setSearchRecipes] = useState("");
  console.log(API_KEY);
  async function findRecipes(value) {
    const recipes = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?${value}&number=100&apiKey=${API_KEY}`
    ).then((recipes) =>
      recipes
        .json()
        .then((data) => {
          setSearchRecipes(data);
          console.log(data);
        })
        .catch(() => {
          console.log("erro");
          console.log(process.env.SPOONACULAR_API_KEY);
        })
    );
    return recipes;
  }

  return (
    <div>
      <Search
        findRecipes={findRecipes}
        searchRecipes={searchRecipes}
        setSearchRecipes={setSearchRecipes}
      />
    </div>
  );
};

export default Home;
