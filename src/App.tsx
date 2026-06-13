import Message from "./Meassage"
import NavBar from "./components/NavBar";
import Parallaxtest from "./components/parallaxtest";
import AiChat from "./ai-integration/AiChat";
import AboutPage from "./components/Aboutpage";
import "./App.css"



function App() {
  return (
    <div>
      <NavBar />
      <Parallaxtest />
      <AboutPage />
      <AiChat />
    </div>
  );
}


export default App;