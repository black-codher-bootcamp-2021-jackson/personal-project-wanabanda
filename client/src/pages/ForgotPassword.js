import React, { useState } from "react";
import axios from "axios";
import "../style/Form.css";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fphandleSubmite = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "/api/forgotpassword",
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="form">
      <form
        id="forgotPassword"
        className="form-content"
        onSubmit={fphandleSubmite}
      >
        <h3 className="form-heading">forgot password?</h3>
        <div className="form-group">
          {error && <span className="error-text">{error}</span>}
          {success && <span className="success-text">{success}</span>}
          <p className="subtext">
            Please enter the email address to restset your account
          </p>
          <input
            required
            type="text"
            id="emailInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="submitBtn"></button>
      </form>
    </div>
  );
};

export default ForgotPassword;
