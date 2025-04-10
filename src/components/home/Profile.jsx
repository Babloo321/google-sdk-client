import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import axios from 'axios';

const Profile = () => {
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosPrivate.get('user/me');
        // const res = await axios.get("http://localhost:4040/api/v2/user/me");
        console.log("res user data: ",res?.data.data);
        setUser(res?.data?.data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };

    fetchUser();
  }, [axiosPrivate]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-auto bg-gray-100 px-4 py-8">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center text-center">
          <img
            src={user.picture}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md mb-4 object-cover"
          />
          <h2 className="text-2xl font-semibold text-gray-800">{user.userName}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
