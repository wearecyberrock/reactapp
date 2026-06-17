import React from 'react';
import NavBar from "./components/NavBar";
import ParallaxTest from './components/parallaxtest';
/*import AiChat from "./ai-integration/AiChat";*/
import AboutPage from "./components/Aboutpage";
import Footer from "./components/Footer"; // Keep Footer
import "./App.css"


const App: React.FC = () => {
  return (
    <div>
      <NavBar />
      <ParallaxTest />
      <AboutPage />
      <Footer /> 
    </div>
  );
};


export default App;