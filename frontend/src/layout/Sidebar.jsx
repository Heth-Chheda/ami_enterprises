import {
  logout,
  resetAuthenticationSlice,
} from "@/store/slices/authenticationSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, setSelectedComponent }) => {
  const dispatch = useDispatch();
  // const {} = useSelector(state => state.popup);
  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.authentication
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthenticationSlice());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAuthenticationSlice());
    }
  }, [dispatch, isAuthenticated, loading, error, message]);
  return (
    <>
      <aside
        className={`${
          isSidebarOpen ? "left-0" : "left-full"
        } z-10 transition-all duration-700 md:relative md:left-0 flex w-64 bg-black text-white flex-col h-full`}
        style={{ position: "fixed" }}
      >
        <div className="px-6 py-4 my-8"></div>
      </aside>
    </>
  );
};

export default Sidebar;
