import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider, useDispatch } from "react-redux"; // Redux Provider
import { store } from "./store/store.js";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import OTP from "./pages/OTP";
import ResetPassword from "./pages/ResetPassword";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./layout/DashboardLayout";
import ContactUs from "./pages/Contact";
import CartPage from "./pages/CartPage";
import { useEffect } from "react";
import { setUser } from "./store/slices/cartSlice";
import ProductPage from "./pages/Product";
import ProductDetailPage from "./components/ui/Product/ProductDetailPage";
import Checkout from "./pages/Checkout";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const userId = localStorage.getItem("user_id");

    // ✅ Load user and cart if token and userId exist
    if (token && userId) {
      dispatch(setUser(userId));
    }
  }, [dispatch]);
  return (
    <Provider store={store}>
      {" "}
      {/* Wrap Redux */}
      <Router>
        {/* Navbar available across all routes */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/otp-verification/:email" element={<OTP />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/*" element={<DashboardLayout />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <ToastContainer theme="dark" />
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
