import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth.js';
import ViewProducts from '../pages/header/ViewProducts.jsx';
function LinkHandler() {
  const { token } = useAuth();
  return(
    <div className='w-full h-auto bg-gray-500 text-white overflow-hidden'>
        <div className='h-screen flex flex-row gap-12 justify-center items-center p-12 bg-green-400 text-red-600 overflow-hidden'>
        {
          token ? (
            <>
           <ViewProducts />
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