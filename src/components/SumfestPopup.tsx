import { useState } from 'react';
import './SumfestPopup.css'; // Importing the premium styles

export default function SumfestPopup() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSupportRequest = () => {
    // This opens your inquiry form page in a new tab
    window.open('YOUR_FORM_LINK_HERE', '_blank');
    setIsOpen(false); 
  };

  return (
    <div>
      {/* Trigger Button (Just for testing visibility) */}
      <button className="jahtaria-trigger-btn" onClick={() => setIsOpen(true)}>
        Sumfest 2026 Travel Support
      </button>

      {/* The Modal Overlay */}
      {isOpen && (
        <div className="jahtaria-overlay">
          <div className="jahtaria-modal">
            
            {/* Close Button */}
            <button className="jahtaria-close-btn" onClick={() => setIsOpen(false)}>
              &times;
            </button>

            {/* Top Image Section */}
            <div className="jahtaria-image-header">
              {/* Replace 'sumfest-image.jpg' with your actual image path in the public folder */}
              <img 
                src="/sumfest-image.jpg" 
                alt="Reggae Sumfest 2026 Jamaica" 
                className="jahtaria-header-img"
              />
              {/* Subtle Reggae Color Accent Bar */}
              <div className="jahtaria-accent-bar"></div>
            </div>

            {/* Content Section */}
            <div className="jahtaria-content">
              <h2 className="jahtaria-headline">Coming to Jamaica for Sumfest?</h2>
              
              <p className="jahtaria-subheadline">
                Let Jahtaria help coordinate airport transfers, hotel support, event-night transport, and local travel logistics.
              </p>

              {/* Highlighted Services List */}
              <ul className="jahtaria-services-list">
                <li>Airport transfer coordination</li>
                <li>Hotel & location support</li>
                <li>Event-night transportation</li>
                <li>Custom travel planning</li>
              </ul>

              {/* Call to Action Button */}
              <button className="jahtaria-cta-btn" onClick={handleSupportRequest}>
                Request Sumfest Travel Support
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}