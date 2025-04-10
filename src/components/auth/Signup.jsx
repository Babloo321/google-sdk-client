import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const generatePassword = (length = 12) => {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '^*_<>';
  const allChars = upper + lower + numbers + symbols;

  let password = upper[0] + lower[0] + numbers[0] + symbols[0];
  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  return password.split('').sort(() => 0.5 - Math.random()).join('');
};

export const password = generatePassword();

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    picture: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.picture) {
      toast.error("Please upload a picture");
      return;
    }

    const dataToSend = new FormData();
    dataToSend.append('userName', formData.userName);
    dataToSend.append('email', formData.email);
    dataToSend.append('password', formData.password);
    dataToSend.append('picture', formData.picture);

    try {
      const response = await axios.post(
        'http://localhost:4040/api/v2/user/register',
        dataToSend,
        { withCredentials: true }
      );

      if (response.status > 201) {
        toast.info('User already exists');
        return;
      }

      toast.success('Signup successful! Redirecting...');
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  const googleAuthLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const googleUser = await res.json();

        const response = await axios.post(
          'http://localhost:4040/api/v2/user/google-auth',
          {
            email: googleUser.email,
            name: googleUser.name,
            picture: googleUser.picture,
            password,
          },
          { withCredentials: true }
        );

        toast.success(response?.data?.data?.message || 'Signed up with Google!');
        navigate('/login');
      } catch (error) {
        toast.error(error.message || 'Google login failed');
      }
    },
    onError: () => toast.error('Google Login Failed'),
  });

  return (
    <div className="min-h-screen flex items-center justify-center fancy-gradient overflow-hidden">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['userName', 'email', 'password'].map((field, i) => (
            <div key={i}>
              <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
              <input
                type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium mb-1">Picture</label>
            <input
              type="file"
              name="picture"
              accept="image/*"
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

        <div className="p-2 mt-2 flex justify-center items-center">
          <span className="text-sm text-amber-400">Already Have an Account?</span>
          <span
            className="text-red-800 ml-2 text-sm font-bold cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </div>

        <div className="my-4 text-center text-gray-500">or</div>

        <button
          onClick={() => googleAuthLogin()}
          className="w-full min-w-[300px] bg-black text-gray-200 hover:bg-gray-200 hover:text-black border border-gray-300 rounded-full py-2 px-4 shadow hover:shadow-lg flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer"
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
