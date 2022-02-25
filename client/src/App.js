import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// SERVICES THAT CALL OUR API ENDPOINTS
//import { getAllProfiles } from "./services/profileService";
import Header from "./components/Header";

import Search from "./components/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ViewProfile from "./components/Profile/ViewProfile";
import Saved from "./components/Saved";
import RecipeList from "./components/RecipeList";
import DisplayRecipe from "./components/DisplayRecipe";

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [items, setItems] = useState([]);
  const [term, setTerm] = useState("");
  const [saved, setSaved] = useState([]);

  //addToBasket(): Allows a product to be added to the <Basket/>
  const addToSaved = (id) => {
    setSaved(saved.concat(items.filter((item) => item.id === id)));
    setItems([
      ...items.map((item) => {
        if (item.id === id) {
          item.inSaved = true;
        }
        return item;
      }),
    ]);
  };

  //removeFromBasket(): Allows a product to be removed from the <Basket/>
  const removeFromSaved = (id) => {
    setSaved(saved.filter((item) => item.id !== id));
    setItems([
      ...items.map((item) => {
        if (item.id === id) {
          item.inSaved = false;
        }
        return item;
      }),
    ]);
  };

  //search(): Searches API for the terms entered by the user
  async function search(value) {
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${value}&number=100&apiKey=${API_KEY}`;

    const results = await fetch(url).then((res) => res.json());
    const savedIds = saved.map((item) => item.id);
    if (!results.error) {
      setItems(results.filter((item) => !savedIds.includes(item.id)));
    }
  }

  const [instuction, setInstruction] = useState();
  async function display(id) {
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;
    const results = await fetch(url).then((res) => res.json());

    if (!results.error) {
      setInstruction(results);
    }
  }

  return (
    <BrowserRouter>
      <div className="c">
        {" "}
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Search search={search} term={term} setTerm={setTerm} />
                <RecipeList
                  items={items}
                  stored="library"
                  addToSaved={addToSaved}
                  removeFromSaved={removeFromSaved}
                />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/resetToken" element={<ResetPassword />} />
          <Route path="/profile" element={<ViewProfile />} />
          <Route
            path="/saved"
            element={
              <>
                <Saved
                  saved={saved}
                  removeFromSaved={removeFromSaved}
                  addToSaved={addToSaved}
                  stored="saved"
                />
              </>
            }
          />
          <Route
            path="recipes/:id"
            element={
              <>
                <DisplayRecipe
                  display={display}
                  instuction={instuction}
                  setInstruction={setInstruction}
                />
                <RecipeList items={items} instuction={instuction} />
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
