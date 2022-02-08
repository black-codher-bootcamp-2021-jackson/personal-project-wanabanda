import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// SERVICES THAT CALL OUR API ENDPOINTS
//import { getAllProfiles } from "./services/profileService";
import Home from "../src/pages/Home";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
