import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getAllProductsApi } from '../../api/product.api.js';
import { toast } from "react-toastify";

const ProductList = () => {
  const AxiosPrivate = useAxiosPrivate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">My Products</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
          {products.map(product => (
            <div key={product._id} className="bg-white rounded-xl p-4 shadow">
              <h2 className="text-lg font-semibold">{product.productName}</h2>
              <p className="text-sm text-gray-500">Company: {product.company}</p>
              <p className="text-sm text-gray-500">Category: {product.category}</p>
              <p className="text-sm font-medium">Price: ${product.productPrice}</p>
              <p className="text-sm text-green-600">Discount: {product.discount}%</p>
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
    </div>
  );
};

export default ProductList;
