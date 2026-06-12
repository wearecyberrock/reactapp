import Message from "./Meassage"
import NavBar from "./components/NavBar";
import Parallaxtest from "./components/parallaxtest";
import AiChat from "./ai-integration/AiChat";
import "./App.css"


function App() {
  return (
    <div>
     
      <NavBar />
      <Parallaxtest />
      <AiChat />
    </div>
  );
}


export default App;