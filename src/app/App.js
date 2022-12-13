import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Cart from "./components/pages/cart";
import HomePage from "./components/pages/homePage";
import NotFound from "./components/pages/notFound";

import "./scss/app.scss";

export const SeacrhContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchQuery = ({ target }) => {
    setSearchValue(target.value);
  };

  const handleSearchClear = () => {
    setSearchValue("");
  };

  return (
    <div className="wrapper">
      <SeacrhContext.Provider
        value={{ searchValue, handleSearchQuery, handleSearchClear }}
      >
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SeacrhContext.Provider>
    </div>
  );
}

export default App;
