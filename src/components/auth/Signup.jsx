import React, { useState } from 'react';
import { useGoogleLogin  } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
const generatePassword = (length = 12) => {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '^*_<>';

  const allChars = upper + lower + numbers + symbols;

  let password = '';
  // Ensure the password has at least one of each character type
  password += upper[Math.floor(Math.random() * upper.length)];
  password += lower[Math.floor(Math.random() * lower.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  // Fill the rest of the password length
  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password so the first characters aren't always predictable
  return password
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');
};
export const password = generatePassword();
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userName:'',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await axios.post(
      `http://localhost:4040/api/v2/user/register`,
      {
        email: formData.email,
        userName: formData.userName,
        password:formData.password,
      },
      {
        withCredentials: true, // include cookies if you're using them
      }
    );
    if(response.error > 201){
      toast.info("User With this email is already exists")
      navigate("/signup");
    }
    if(response){
      toast.success("Successfully Signup! Redirecting to login page");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }else{
      toast.alert("Network Error");
    }
  };

  const googleAuthLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch Google user info');
        }
        
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
      
        const { message } = response.data.data;
          toast.success(message || "Successfully Signup")
          navigate("/login");
      } catch (error) {
        toast.error(error.message || "Network Error");
        navigate("/signup");
      }
    },
    onError: () => {
      toast.error("Goolge Login-In Failed");
    },
  });

  const redirectLogin = () =>{
    navigate("/login")
  }
  return (
    <div className="min-h-auto h-screen flex items-center justify-center fancy-gradient overflow-hidden">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
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
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email" // ✅ lowercase to match formData key
              value={formData.email}
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
            Sign Up
          </button>
        </form>

        <div className='p-2 mt-0.5 items-center flex justify-center'>
        <span className='text-sm text-amber-400'>Already Have an Account?</span>
        <span className='text-red-800 ml-2 text-sm font-bold' onClick={redirectLogin}>Login</span>
        </div>

        <div className="my-4 text-center text-gray-500">or</div>
        <button
      onClick={() => googleAuthLogin()}
      className="w-full min-w-[300px] bg-black text-gray-200 hover:bg-gray-200 hover:text-black border border-gray-300 rounded-full py-2 px-4 shadow hover:shadow-lg flex items-center justify-center gap-3 transition-all duration-300 hover:cursor-pointer"
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google"
        className="w-5 h-5"
      />
      <span className="font-medium">Sign up with Google</span>
    </button>
      </div>
    </div>
  );
};

export default Signup;
