import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Cart from "./components/pages/cart";
import HomePage from "./components/pages/homePage";
import NotFound from "./components/pages/notFound";

import "./scss/app.scss";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
