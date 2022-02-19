import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../style/Form.css";

const Login = (history) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //check if user is already logged in
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const lhandleSubmite = async (e) => {
    e.preventDefault();
    //delete
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "/api/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="form">
      <form id="login" className="form-content" onSubmit={lhandleSubmite}>
        <h3 className="form-heading">Login</h3>
        <div className="form-group">
          {error && <span className="error">{error}</span>}
          <label>Email</label>
          <input
            required
            type="text"
            id="emailInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <Link to="fogotpassword" className="forgotpassword">
            {" "}
            Forgot your Password
          </Link>
          <input
            required
            type="text"
            id="passwordInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submitBtn">
          Login in
        </button>
        <span className="subtext">
          Don't have an account?
          <Link to="/resgister">Join</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
