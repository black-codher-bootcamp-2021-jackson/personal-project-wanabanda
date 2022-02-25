import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../style/Form.css";

const Register = ({ history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  //check if user is already logged in
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
    }
  }, [history]);

  const rhandleSubmite = async (e) => {
    e.preventDefault();
    //delete
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //check if passwords match
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Password do not match");
    }
    try {
      const { data } = await axios.post(
        "/api/register",
        { username, email, password },
        config
      );

      localStorage.setItem("authToken", data.token);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <div className="form">
      <form id="register" className="form-content" onSubmit={rhandleSubmite}>
        <h3 className="form-heading">Register</h3>
        <div className="form-group">
          {error && <span className="error">{error}</span>}
          <label>Username</label>
          <input
            required
            type="text"
            id="userNameInput"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Email</label>
          <input
            required
            type="text"
            id="emailInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            required
            type="text"
            id="passwordInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Confirm Password</label>
          <input
            required
            type="text"
            id="comfirmPasswordInput"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submitBtn">
          Regitser
        </button>
        <span className="subtext">
          Already have an account? lets get cooking!
          <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
