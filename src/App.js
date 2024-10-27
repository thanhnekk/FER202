import { Route, Routes, BrowserRouter, Router } from "react-router-dom";
import HomePage from "./page/user/homepage";
import AllProduct from "./page/user/AllProduct";
import CategoryProducts from "./page/user/CategoryProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/products/all" element={<AllProduct />}></Route>
        <Route
          path="/products/category/:categoryId"
          element={<CategoryProducts />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
