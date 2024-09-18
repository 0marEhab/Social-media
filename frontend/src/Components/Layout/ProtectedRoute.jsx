import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "./Loading";

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      navigate("/signing");
    } else {
      setLoading(false); 
    }
  }, [navigate]);

  if (loading) {
    return <Loading color="#000"/>;
  }

  return <Outlet />;
}
