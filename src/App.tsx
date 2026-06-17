import NavBar from "./components/NavBar";
import Parallaxtest from "./components/parallaxtest";
import AiChat from "./ai-integration/AiChat";
import AboutPage from "./components/Aboutpage";
import Footer from "./components/Footer";
import SumfestPopup from "./components/SumfestPopup";
import "./App.css"



function App() {
  return (
    <div>
      <NavBar />
      <Parallaxtest />
      <AboutPage />
      <AiChat />
      <Footer />
      <SumfestPopup />
    </div>
  );
}


export default App;