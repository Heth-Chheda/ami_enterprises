// ---------------------------- Dependencies-------------------------------
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

//---------------Pages Imports ---------------------------------------
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import OTP from "./pages/OTP";
import ResetPassword from "./pages/ResetPassword";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/password/forgot" element={<ForgotPassword />}></Route>
          <Route path="/otp-verification/:email" element={<OTP />}></Route>
          <Route
            path="/password/reset/:token"
            element={<ResetPassword />}
          ></Route>
        </Routes>
        <ToastContainer theme="dark" />
      </Router>
    </>
  );
}

export default App;
