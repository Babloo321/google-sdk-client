import React, { useState } from "react";
import useAxiosPrivate from '../../hooks/useAxiosPrivate.js';
import { addProductApi } from "../../api/product.api.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const navigate = useNavigate();
  const AxiosPrivate = useAxiosPrivate();
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    discount: "",
    company: "",
    category: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await addProductApi(AxiosPrivate,formData)
      console.log("res: ",response);
      
      setMessage("Product added successfully!");
      toast.success("Product added successfully!");
      setFormData({
        productName: "",
        productPrice: "",
        discount: "",
        company: "",
        category: "",
      });
      navigate("/view-products")
    } catch (error) {
      setMessage("Error adding product.");
      toast.error("Error adding product." || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-pink-600 min-h-screen mt-0">
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl py-5">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["productName", "productPrice", "discount", "company", "category"].map(
          (field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-700 capitalize"
              >
                {field.replace("product", "Product ")}
              </label>
              <input
                type={field === "productPrice" || field === "discount" ? "number" : "text"}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                required
              />
            </div>
          )
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Product"}
        </button>

        {message && (
          <p className="text-center mt-4 text-sm text-green-600">{message}</p>
        )}
      </form>
    </div>
    </div>
  );
};

export default AddProduct;
