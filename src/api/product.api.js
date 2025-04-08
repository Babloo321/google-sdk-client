import { AxiosPrivate } from "./axiosInstance";

export const addProductApi = async(AxiosPrivate,formData) =>{
  try {
    const response = await AxiosPrivate.post("/products/add-product",formData);
    return response.data;
  } catch (error) {
    return "Not added product";
  }
}

export const getAllProductsApi = async(AxiosPrivate,currentPage,limit) =>{
  try {
    const response = await AxiosPrivate.get("/products/view-products",{
      params: { page: currentPage, limit },
    });
    return response?.data?.data;
  } catch (error) {
    return "Not get any Products";
  }
}
