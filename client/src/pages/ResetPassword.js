import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../style/Form.css";

const ResetPassword = ({ match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const rphandleSubmite = async (e) => {
    e.preventDefault();

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
      const { data } = await axios.put(
        `/api/resetpassword/${match.params.resetToken}`,

        config
      );

      console.log(data);
      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="form">
      <form id="resretPassword" className="rp" onSubmit={rphandleSubmite}>
        <h3 className="form-heading">Reset Password</h3>
        <div className="form-group">
          {error && <span className="error-text">{error}</span>}
          {success && (
            <span className="success-text">
              <Link to="/login">Login</Link>
            </span>
          )}
          <p className="rp-subtext">Please enter a new password.</p>

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
        <button type="submit" className="submitBtn"></button>
      </form>
    </div>
  );
};

export default ResetPassword;
