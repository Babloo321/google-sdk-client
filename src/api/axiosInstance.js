import axios from "axios";
const BASE_URL = "http://localhost:4040/api/v2";
export const AxiosPublic = axios.create({
  baseURL: BASE_URL
});

export const AxiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});


