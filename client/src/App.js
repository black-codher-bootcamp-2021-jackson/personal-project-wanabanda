import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// SERVICES THAT CALL OUR API ENDPOINTS
//import { getAllProfiles } from "./services/profileService";
import Home from "../src/pages/Home";

import Profile from "./components/Profile/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Profile exact path="/" component={Profile} />
        <Route exact path="/" component={<Home />} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/resetpassword" component={ResetPassword} />
      </Routes>
    </Router>
  );
}

export default App;
