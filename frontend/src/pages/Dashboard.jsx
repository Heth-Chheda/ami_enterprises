import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserInformation } from "@/store/slices/authenticationSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authentication);

  useEffect(() => {
    dispatch(getUserInformation());
  }, [dispatch]);

  useEffect(() => {
    if (user?.user_role) {
      if (user.user_role === "admin") {
        navigate("/dashboard/admin");
      } else if (user.user_role === "customer") {
        navigate("/dashboard/user");
      }
    }
  }, [user, navigate]);

  return <div>Loading Dashboard...</div>;
};

export default Dashboard;
