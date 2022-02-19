import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// SERVICES THAT CALL OUR API ENDPOINTS
//import { getAllProfiles } from "./services/profileService";
import Header from "./components/Header";

import Home from "./pages/Home";
//import Search from "./components/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ViewProfile from "./components/Profile/ViewProfile";
import Saved from "./pages/Saved";

//const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  /*  const [items, setItems] = useState("");
  const [saved, setSaved] = useState("");
 
 
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

  //search(): Searches the iTunes API for the terms entered by the user
  async function search(value) {
    const url = ` https://api.spoonacular.com/recipes/complexSearch?lime&number=100&apiKey=${API_KEY}`;
    const results = await fetch(url).then((res) => res.json());
    const savedIds = basket.map((item) => item.id);
    if (!results.error) {
      setItems(
        results.results.filter((item) => !basketIds.includes(item.trackId))
      );
    }
  }
*/
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
                <Home />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/resetToken" element={<ResetPassword />} />
          <Route path="/profile" element={<ViewProfile />} />
          <Route path="/saved" element={Saved} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
