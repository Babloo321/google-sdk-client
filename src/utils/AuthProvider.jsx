import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth.js";
import { toast } from "react-toastify";
axios.defaults.withCredentials = true;

const CheckAuthProvider = ({ children }) => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(true); // 👈 Add this

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await axios.post("http://localhost:4040/api/v2/user/refresh-token", {}, { withCredentials: true });
        const { user, accessToken, refreshToken } = res.data.data;
        if (user && accessToken) {
          login({ user, accessToken, refreshToken });
        }
      } catch (err) {
        toast.error("User Not logged in")
      } finally {
        setLoading(false); // ✅ Always stop loading
      }
    };

    checkLoggedIn();
  }, []);

  if (loading) return <div>Loading...</div>; // 👈 Show loader until auth check finishes

  return children;
};

export default CheckAuthProvider;
