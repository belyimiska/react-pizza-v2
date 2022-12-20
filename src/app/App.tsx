import { Route, Routes } from "react-router-dom";
import Cart from "./components/pages/cart";
import HomePage from "./components/pages/homePage";
import NotFound from "./components/pages/notFound";
import FullPizza from "./components/pages/fullPizza";
import MainLayout from "./layouts/mainLayout";

import "./scss/app.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
