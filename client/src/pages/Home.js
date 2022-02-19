import React, { useState, Fragment } from "react";
//import axios from "axios";
import Search from "../components/Search";
import RecipeList from "../components/RecipeList";
const API_KEY = process.env.REACT_APP_API_KEY;

const Home = () => {
  const [items, setItems] = useState([]);
  const [term, setTerm] = useState("");
  const [saved, setSaved] = useState([]);
  //const authToken = localStorage.getItem("token");
  //console.log(API_KEY);
  //search(): Searches the API for the terms entered by the user
  /*useEffect(() => {
    const axiosData = async () => {
      await axios
        .get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`
        )
        .then(function (response) {
          setItems(response.data.results);
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    };
    axiosData();
  }, []);
*/

  //search(): Searches the iTunes API for the terms entered by the user
  async function search(value) {
    const url = `https://api.spoonacular.com/recipes/complexSearch?lime&number=100&apiKey=${API_KEY}`;

    const results = await fetch(url).then((res) => res.json());
    const savedIds = saved.map((item) => item.id);
    if (!results.error) {
      setItems(results.results.filter((item) => !savedIds.includes(item.id)));
    }
  }
  return (
    <>
      <Fragment>
        <Search search={search} term={term} setTerm={setTerm} />
        <RecipeList
          items={items}
          store="saved"
          //addToSaved={addToSaved}
          //removeFromSaved={removeFromSaved}
        />
      </Fragment>
    </>
  );
};

export default Home;
