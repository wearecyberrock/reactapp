import { Fragment } from "react";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/jahtaria-logo.png" alt="Jahtaria Travel Services" className="logo-icon" />
        <h2>Jahtaria Travel level 1 coded website..soone make it into a lv2</h2>
      </div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#login">Login</a></li>
      </ul>
    </nav>
  );
}

export default NavBar;
