import React from "react";
import { useNavigate } from "react-router-dom";
import "./Thanks.css";

const Thanks = () => {
  const navigate = useNavigate();
  // Function to back to the home page

  const home = () => {
    navigate("/dashboard");
  };
  return (
    <div className="thanks">
      <div className="heading-data">Thanks for the business with us </div>
      <button className="home-button" onClick={home}>
        Back to the home page
      </button>
      <p className="emoji">&#128516; </p>
    </div>
  );
};

export default Thanks;
