import React from 'react';
import './SumfestPopup.css'; // Importing the premium styles

interface SumfestPopupProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SumfestPopup: React.FC<SumfestPopupProps> = ({ isOpen, setIsOpen }) => {

  const handleSupportRequest = () => {
    setIsOpen(false);
    window.open('/sumfest-inquiry', '_blank');
  };

  return (
    <>
      {/* The Modal Overlay */}
      {isOpen && (
        <div className="jahtaria-overlay">
          <div className="jahtaria-modal">
            
            {/* Close Button */} {/* Added aria-label for accessibility */}
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
    </>
  );
};

export default SumfestPopup;