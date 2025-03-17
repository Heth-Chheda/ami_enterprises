import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const UserDashboard = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.authentication);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/"); // Redirect to Home if not authenticated
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h2>User Dashboard</h2>
      {/* Your chart or dashboard content here */}
    </div>
  );
};

export default UserDashboard;
