import React from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav id="navbar">
      <span onClick={() => navigate("/")} className="site_name">
        Cosmo Chat
      </span>
    </nav>
  );
};

export default NavBar;
