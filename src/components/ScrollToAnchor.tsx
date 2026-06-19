import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToAnchor = () => {
  const location = useLocation();
  const lastHash = useRef('');

  useEffect(() => {
    // Only run if there's a hash in the URL
    if (location.hash) {
      lastHash.current = location.hash.slice(1); // e.g., 'about'
    }

    // If we have a hash to scroll to, find the element and scroll
    if (lastHash.current && document.getElementById(lastHash.current)) {
      const element = document.getElementById(lastHash.current);
      if (element) {
        // Use a timeout to ensure the element is rendered before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          lastHash.current = ''; // Clear the hash after scrolling
        }, 100);
      }
    }
  }, [location]);

  return null; // This component doesn't render anything
};

export default ScrollToAnchor;