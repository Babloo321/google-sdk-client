import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth.js';
import useAxiosPrivate from '../hooks/useAxiosPrivate.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Profile from './home/Profile.jsx';
function LinkHandler() {
  const AxiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const handleLogout = async()=>{
    try {
      const response = await AxiosPrivate.post("/user/logout");
      const { success, message } = response.data;
      console.log("success: ", success);
      if(success){
        toast.success(message);
        logout();
        setTimeout(() => {
          navigate("/")
        }, 3000);
      }else{
        toast.info("Not logging out!")
      }
        
    } catch (error) {
      toast.error("something went wrong with logging out!" || error.message);
      return;
    }
  }
  
  return(
    <div className='w-full h-auto bg-gray-500 text-white overflow-hidden'>
        <div className='h-screen flex flex-row gap-12 justify-center items-center p-12 bg-green-400 text-red-600 overflow-hidden'>
        {
          token ? (
            <>
            {/* <Link to="/Logout" className='text-3xl p-3 bg-gray-300 rounded-2xl font-extrabold'>After Login</Link> */}
            <button 
            onClick={handleLogout}
            className='text-3xl text-green-800 p-3 bg-gray-300 rounded-2xl font-extrabold'>Logout</button>
            <Profile />
            </>
          ) : (
            <>
            <Link to="/signup" className='text-3xl p-3 bg-gray-300 rounded-2xl font-extrabold'>Signup</Link>
          <Link to="/login" className='text-3xl p-3 bg-gray-300 rounded-2xl font-extrabold text-blue-500'>Login</Link>
      
            </>
          )
        }
           </div>
    </div>
  )
}
export default LinkHandler