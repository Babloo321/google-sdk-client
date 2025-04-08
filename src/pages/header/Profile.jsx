// src/components/user/CurrentUser.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { currentUserApi } from "../../api/user.api.js";
const Profile = () => {
  const AxiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const res = await currentUserApi(AxiosPrivate)
      setUser(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading user data...</p>;
  }

  if (!user) {
    return <p className="text-center mt-10 text-red-500">No user found.</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-blue-400 shadow-lg rounded-xl p-6 text-center">
      <img
        src={user.picture}
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
      />
      <h2 className="text-xl font-semibold mb-1">{user.name || "No Name"}</h2>
      <p className="text-gray-800 mb-1">{user.userName}</p>
      <p className="text-gray-800">{user.email}</p>
    </div>
  );
};

export default Profile;
