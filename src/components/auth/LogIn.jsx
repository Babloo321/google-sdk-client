import React, { useState } from 'react';
import { useGoogleLogin  } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import { toast } from 'react-toastify';
import axios from 'axios';
import { password } from './Signup';
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4040/api/v2/user/login`,
        formData,
        {
          withCredentials: true, // include cookies if you're using them
        }
      );
      const { user, accessToken, refreshToken } = response.data.data;
      if(user && accessToken){
        const logingData = {
          user:user,
          accessToken:accessToken,
          refreshToken:refreshToken
        }
        login(logingData);
        toast.success("Successfully Login")
        setTimeout(() => {
          navigate("/");
        },1000);

      }
      } catch (error) {
        toast.error(error.message)
        navigate("/login")
    }
  };

  const handleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const googleUser = await res.json();
        const response = await axios.post(
          `http://localhost:4040/api/v2/user/google-auth`,
          {
            email: googleUser.email,
            name: googleUser.name,
            picture: googleUser.picture,
            password
          },
          {
            withCredentials: true, // include cookies if you're using them
          }
        );
      
        const { accessToken, refreshToken, user } = response.data.data;
        
        if(user && accessToken){
          const logingData = {
            user:user,
            accessToken:accessToken,
            refreshToken:refreshToken
          }
          login(logingData);
          toast.success("Successfully Login")
          setTimeout(() => {
            navigate("/");
            window.close();
          },1000);
  
        }
      } catch (error) {
        toast.error(error.message)
        navigate("/login");
      }
    },
    onError: () => {
      toast.error("Goolge Login-In Failed");
    },
  });

  const redirectSignup = () =>{
    navigate("/signup")
  }
  return (
    <div className="min-h-auto h-screen flex items-center justify-center fancy-gradient overflow-hidden">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">UserName</label>
            <input
              type="text"
              name="userName" // ✅ lowercase to match formData key
              value={formData.userName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className='p-2 mt-0.5 items-center flex justify-center'>
        <span className='text-sm text-amber-400'>Don't Have an Account?</span>
        <span className='text-red-800 ml-2 text-sm font-bold' onClick={redirectSignup}>Signup</span>
        </div>
        <div className="my-4 text-center text-gray-500">or</div>
        <button
      onClick={() => handleLogin()}
      className="w-full min-w-[300px] bg-black text-gray-200 hover:bg-gray-200 hover:text-black border border-gray-300 rounded-full py-2 px-4 shadow hover:shadow-lg flex items-center justify-center gap-3 transition-all duration-300 hover:cursor-pointer"
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google"
        className="w-5 h-5"
      />
      <span className="font-medium">Login up with Google</span>
    </button>
      </div>
    </div>
  );
};

export default Login;
