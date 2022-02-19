import NavigationBar from "./components/Navbar/Navbar";
import React from "react";
import "./App.less";
import "./global.scss";
import "./fonts/MYRIADPRO-REGULAR.OTF";
import "./fonts/MYRIADPRO-SEMIBOLD.OTF";
import LandingPage from "./components/LandingPage/LandingPage";
function App() {
  return (
    <div className="App">
      <NavigationBar />
      <LandingPage />
    </div>
  );
}

export default App;
