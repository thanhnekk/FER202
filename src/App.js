import { Route, Routes, BrowserRouter, Router } from "react-router-dom";
import HomePage from "./page/user/homepage";
import AllProduct from "./page/user/AllProduct";
import CategoryProducts from "./page/user/CategoryProduct";
import AllSaleProduct from "./page/user/AllSaleProduct";
import AllNewProduct from "./page/user/AllNewProduct";
import ProductDetail from "./page/user/ProductDetail";
import LogIn from "./page/user/LogIn";
import Account from "./page/user/Account";
import SearchResult from "./page/user/SearchResult";
import SearchResultsPage from "./page/user/SearchResultPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/products/all" element={<AllProduct />}></Route>
        <Route path="/products/sale" element={<AllSaleProduct />} />
        <Route path="/products/new" element={<AllNewProduct />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route
          path="/products/category/:categoryId"
          element={<CategoryProducts />}
        />
        <Route
          path="/products/category/:categoryId/subcategory/:subcategoryId"
          element={<CategoryProducts />}
        />
        <Route path="/login" element={<LogIn/>}></Route>
        <Route path="/account" element={<Account/>}></Route>
        <Route path="/searchResult" element={<SearchResultsPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
