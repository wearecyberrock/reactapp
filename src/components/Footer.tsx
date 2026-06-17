import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-brand">
          <img src="/jahtaria-logo.png" alt="Jahtaria Travel Services" className="footer-logo" />
          <h3>Jahtaria Travel Services</h3>
          <p>Your trusted partner in U.S. visa preparation.</p>
        </div>

        <div className="footer-links">
          <h4>Navigation</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Get in Touch</h4>
          <p>WhatsApp: <a href="https://wa.me/18762957011">18762957011</a></p>
          <p>Email: <a href="mailto:Jahtariatravelservices@gmail.com">Jahtariatravelservices@gmail.com</a></p>
          <p>Instagram: @jahtaria.travel.services</p>
          <p>TikTok: @jahtaria.travel.services</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Jahtaria Travel Services. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
