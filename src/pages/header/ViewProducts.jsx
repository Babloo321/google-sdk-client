import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getAllProductsApi, deleteProduct } from '../../api/product.api.js';
import { toast } from "react-toastify";
const ProductList = () => {
  const AxiosPrivate = useAxiosPrivate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [pName, setPName] = useState('');
  const limit = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProductsApi(AxiosPrivate, currentPage, limit);
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (err) {
        toast.error("Failed to fetch products"||err.message);
      }
    };

    fetchProducts();
  }, [AxiosPrivate, currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleRemoveProduct = (name) =>{
    setPName(name);
    setShowPopup(true);
  }
  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">My Products</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
          {products.map(product => (
            <div key={product._id} className="bg-white rounded-xl p-4 shadow relative">
              <h2 className="text-lg font-semibold">{product.productName}</h2>
              <p className="text-sm text-gray-500">Company: {product.company}</p>
              <p className="text-sm text-gray-500">Category: {product.category}</p>
              <p className="text-sm font-medium">Price: ${product.productPrice}</p>
              <p className="text-sm text-green-600">Discount: {product.discount}%</p>
          <button 
          onClick={()=>handleRemoveProduct(product.productName)}
          className="p-1 text-white bg-red-500 rounded-xl px-2 absolute right-[10px] bottom-3 cursor-pointer hover:bg-red-800">Remove</button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
      {showPopup && <Popup productName={pName} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default ProductList;

const Popup = ({ onClose, productName }) => {
  const AxiosPrivate = useAxiosPrivate();
  const handleDelete = async()=>{
    
      try {
        const response = await deleteProduct(AxiosPrivate,productName);
        const { message, success} = response;
        if(success){
          toast.info(message);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } catch (error) {
        toast.error(error);
      }
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Remove a Product
        </h2>
        <label htmlFor="productName" className="block text-sm text-gray-700 mb-2">
          Enter Product Name <span className="text-red-900 font-semibold">{`"${productName}"`}</span> to Remove from Your List
        </label>
        <input
          id="productName"
          type="text"
          placeholder="Enter Product Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
          onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};