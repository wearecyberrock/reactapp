import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar";
import ParallaxTest from './components/parallaxtest';
/*import AiChat from "./ai-integration/AiChat";*/
import AboutPage from "./components/Aboutpage";
import Footer from "./components/Footer"; // Keep Footer
import SumfestTravelForm from './sumfestform';
import "./App.css"
import { init } from '@emailjs/browser';


const App: React.FC = () => {
  useEffect(() => {
    // Initialize EmailJS with your Public Key
    init("G3BmmRZGhur0n-ymw");
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Main Landing Page */}
        <Route path="/" element={
          <div>
            <NavBar />
            <ParallaxTest />
            <AboutPage />
            <Footer /> 
          </div>
        } />

        {/* Standalone Form Page */}
        <Route path="/sumfest-inquiry" element={
          <div className="form-page-wrapper">
            <NavBar />
            <div style={{ paddingTop: '100px', paddingBottom: '50px' }}>
              <SumfestTravelForm />
            </div>
            <Footer />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
};


export default App;