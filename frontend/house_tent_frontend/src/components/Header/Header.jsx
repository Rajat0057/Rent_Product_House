import React from "react";
import { useNavigate } from "react-router-dom";
import { getSessionStorage } from "../../services/common";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  let orderObject = getSessionStorage("order_object");
  let name = orderObject.first_name;
  let firstIntial = name.charAt(0).toUpperCase();
  const navigate = useNavigate();

  //   Navigate the user to different Pages
  const profile = () => {
    navigate("/profile");
  };

  return (
    <div>
      <nav className="nav">
        <div className="heading">
          <h3 className="heading-text">Tent Rental House</h3>
          <div className="buttons-box">
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "not-active")}
              to="/dashboard"
            >
              Our Product
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "not-active")}
              to="/summary"
            >
              Our Inventory Summary
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "not-active")}
              to="/transaction"
            >
              Transaction Details
            </NavLink>
          </div>
        </div>
        {/* Dropdown content foe the user  */}
        <div className="dropdown-content">
          <div className="img">
            <span className="first-letter"> {firstIntial} </span>
          </div>
          <span className="drop-icon"></span>

          <div className="data">
            <a href="#/" className="name">
              {name}
            </a>
            <hr />
            <a href="#/" className="icon" onClick={profile}>
              My Profile
            </a>
            <hr />
            <a href="/" className="icon">
              <span>Logout</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
