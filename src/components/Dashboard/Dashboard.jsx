import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    const infoUser = { nombre: "" };

    if (infoUser === null) {
      navigate("/Login");
    }
  });

  return <div>Dashboard</div>;
};

export default Dashboard;
