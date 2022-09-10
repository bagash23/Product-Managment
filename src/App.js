import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DetilProduct, Home } from "./pages";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detil/:id" element={<DetilProduct />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
