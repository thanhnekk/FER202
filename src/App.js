import { Route, Routes, BrowserRouter, Router } from "react-router-dom";
import HomePage from "./page/user/homepage";
import AllProduct from "./page/user/AllProduct";
import CategoryProducts from "./page/user/CategoryProduct";
import AllSaleProduct from "./page/user/AllSaleProduct";
import AllNewProduct from "./page/user/AllNewProduct";
import ProductDetail from "./page/user/ProductDetail";
import LogIn from "./page/user/LogIn";
import Account from "./page/user/Account";
import { CartProvider } from "../src/context/CardContext";
import Cart from "./component/Cart";
import Checkout from "./component/Checkout";
import NotFound from "./page/404";
import UserProfile from "./page/user/UserProfile";
import AdminDashboard from "./page/admin/AdminDashboard";
import AdminRoute from "../src/routes/AdminRoute";
import ProductManagement from "./page/admin/ProductManagement";
import OrderManagement from "./page/admin/OrderManagement";
import UpdateProduct from "./page/admin/UpdateProduct";
import UserManagement from "./page/admin/UserManagement";
import SearchResultsPage from "../src/page/user/SearchResultPage";
function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/admin" element={<AdminDashboard />}></Route>
          <Route path="/updateproduct/:id" element={<UpdateProduct />}></Route>
          <Route path="/profile" element={<UserProfile />}></Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products/all" element={<AllProduct />}></Route>
          <Route path="/products/sale" element={<AllSaleProduct />} />
          <Route path="/products/new" element={<AllNewProduct />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route
            path="/products/category/:categoryId"
            element={<CategoryProducts />}
          />
          <Route path="/searchResult" element={<SearchResultsPage />}></Route>
          <Route
            path="/products/category/:categoryId/subcategory/:subcategoryId"
            element={<CategoryProducts />}
          />
          <Route path="/account" element={<Account />}></Route>
          <Route path="/login" element={<LogIn />}></Route>
          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <ProductManagement />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <UserManagement />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <OrderManagement />
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
export default App;
