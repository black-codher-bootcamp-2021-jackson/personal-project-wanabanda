import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewProfile = () => {
  const [error, setError] = useState("");
  const [profileData, setProfileData] = useState("");

  useEffect(() => {
    const fetchProfileDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setProfileData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchProfileDate();
  }, []);
  return error ? (
    <span className="pvError">{error}</span>
  ) : (
    <div className="pv">{profileData}</div>
  );
};

export default ViewProfile;
