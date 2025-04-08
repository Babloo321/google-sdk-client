import React from 'react'
import { Link } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate.js'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth.js'
import { toast } from 'react-toastify'
function Header() {
    const navigate = useNavigate();
  const { logout } = useAuth();
  const AxiosPrivate = useAxiosPrivate();
  const handleLogout = async()=>{
    try {
      const response = await AxiosPrivate.post("/user/logout");
      const { success, message } = response.data;
      if(success){
          toast.success(message);
          setTimeout(() => {
            logout();
            return navigate('/');
          }, 1000);
        }
    } catch (error) {
      toast.error("something went wrong with logging out!" || error.message);
      return;
    }
  }
  return (
    <div>
      <ul className='py-2 flex flex-row gap-1 justify-around items-center fancy-gradient'>
        <li className='p-2 text-xl font-bold text-white hover:text-blue-500'><Link to="/">Home</Link></li>
        <li className='p-2 text-xl font-bold text-white hover:text-blue-500'><Link to="add-products">Add-Products</Link></li>
        <li className='p-2 text-xl font-bold text-white hover:text-blue-500'><Link to="view-products">View-Products</Link></li>
        <li className='p-2 text-xl font-bold text-white hover:text-blue-500'><Link to="profile">Profile</Link></li>
        <li 
        onClick={handleLogout}
        className='p-2 text-xl font-bold text-white hover:text-red-800'>Logout</li>
      </ul>
    </div>
  )
}

export default Header