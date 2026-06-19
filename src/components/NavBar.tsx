import React from 'react';
import { useLocation } from 'react-router-dom';

const NavBar: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const getLink = (hash: string) => {
    return isHomePage ? hash : `/${hash}`;
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/jahtaria-logo.png" alt="Jahtaria Travel Services" className="logo-icon" />
        <h2>Jahtaria Travel Services</h2>
      </div>
      <ul className="navbar-links">
        <li><a href={getLink('#home')}>Home</a></li>
        <li><a href={getLink('#about')}>About</a></li>
        <li><a href={getLink('#services')}>Services</a></li>
        <li><a href={getLink('#contact')}>Contact</a></li>
        
      </ul>
    </nav>
  );
};

export default NavBar;
