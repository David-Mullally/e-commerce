import { BrowserRouter, Routes, Route } from "react-router-dom";
////////////My Components////////////////////////
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import RoutesWithUserChatComponent from "./components/user/RoutesWithUserChatComponent";
import ProtectedRoutesComponent from "./components/ProtectedRoutesComponent";
import ScrollToTop from "./utils/ScrollToTop";
///////////My Pages for unprotected routes///////
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductListPage from "./pages/ProductListPage";
import RegistrationPage from "./pages/RegistrationPage";
/////////////My pages for protected routes///////////
/////////////Admin Routes////////////////////////////
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage";
import AdminChatPage from "./pages/admin/AdminChatPage";
import AdminCreateProductPage from "./pages/admin/AdminCreateProductPage";
import AdminEditProductPage from "./pages/admin/AdminEditProductPage";
import AdminEditUserPage from "./pages/admin/AdminEditUserPage";
import AdminOrderDetailsPage from "./pages/admin/AdminOrderDetailsPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
////////////User Routes///////////////////////////////////////
import UserCartDetailsPage from "./pages/user/UserCartDetailsPage";
import UserOrderDetailsPage from "./pages/user/UserOrderDetailsPage";
import UserOrdersPage from "./pages/user/UserOrdersPage";
import UserProfilePage from "./pages/user/UserProfilePage";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <HeaderComponent />
      <Routes>
        <Route element={<RoutesWithUserChatComponent />}>
          {/* unprotected routes*/}
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route
            path="/product-details/:productId"
            element={<ProductDetailsPage />}
          />
          <Route path="/product-list-page" element={<ProductListPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route
            path="*"
            element="Error 404: The page you are trying to find does not exist"
          />

          {
            ///////PROTECTED ROUTES//////////
            /* User routes */
          }
          <Route element={<ProtectedRoutesComponent admin={false} />}>
            <Route path="/user" element={<UserProfilePage />} />
            <Route
              path="/user/cart-details"
              element={<UserCartDetailsPage />}
            />
            <Route path="/user/my-orders" element={<UserOrdersPage />} />
            <Route
              path="/user/order-details"
              element={<UserOrderDetailsPage />}
            />
          </Route>
        </Route>

        {/* Admin routes */}
        <Route element={<ProtectedRoutesComponent admin={false} />}>
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          <Route path="/admin/chat" element={<AdminChatPage />} />
          <Route
            path="/admin/create-product"
            element={<AdminCreateProductPage />}
          />
          <Route
            path="/admin/edit-product"
            element={<AdminEditProductPage />}
          />
          <Route path="/admin/edit-user" element={<AdminEditUserPage />} />
          <Route
            path="/admin/order-details/:id"
            element={<AdminOrderDetailsPage />}
          />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
        </Route>
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
