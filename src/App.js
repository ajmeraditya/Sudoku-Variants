import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Basic9 from "./pages/Basic9";
import Antiknight from "./pages/Antiknight";
import Diagonal from "./pages/Diagonal";
import Nonconsecutive from "./pages/Nonconsecutive";
import Antiking from "./pages/Antiking";
import Scattered from "./pages/Scattered";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/basic9" element={<Basic9 />} />
            <Route exact path="/antiknight" element={<Antiknight />} />
            <Route exact path="/antiking" element={<Antiking />} />
            <Route exact path="/diagonal" element={<Diagonal />} />
            <Route exact path="/scattered" element={<Scattered />} />
            <Route exact path="/nonconsecutive" element={<Nonconsecutive />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
