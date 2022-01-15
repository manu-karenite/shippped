import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import React from "react";

function LoadingToRedirect() {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((current) => --current);
    }, 1000);
    count === 0 && navigate("/");
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div className="p-5 container text-center">
      Redirecting you in {count} seconds
    </div>
  );
}

export default LoadingToRedirect;
