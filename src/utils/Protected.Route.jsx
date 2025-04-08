import{ useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from '../hooks/useAuth.js';
const ProtectedRoute = ({ children }) => {
  const {token}  = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token,navigate]);

  return token ? children : null;
};

export default ProtectedRoute;
