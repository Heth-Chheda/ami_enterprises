import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux"; // Redux Provider
import { SidebarProvider } from "./context/sidebarContext";
import { store } from "./store/store.js";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import OTP from "./pages/OTP";
import ResetPassword from "./pages/ResetPassword";
import Navbar from "./components/navbar";

function App() {
  return (
    <Provider store={store}>
      {" "}
      {/* Wrap Redux */}
      <SidebarProvider>
        {" "}
        {/* Wrap Sidebar Context */}
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
          </Routes>

          <ToastContainer theme="dark" />
        </Router>
      </SidebarProvider>
    </Provider>
  );
}

export default App;
