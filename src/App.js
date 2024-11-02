import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import NavigationBar from "./components/Navbar";
import LogMoods from "./components/LogMoods";
import PurchaseSection from "./components/Purchase/PurchaseSection";
import Journal from "./components/Journal";
import "./styles/customStyles.css";

function App() {
  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/purchase" element={<PurchaseSection />} />
          <Route path="/log-mood" element={<LogMoods />} />
          <Route path="/journal" element={<Journal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
