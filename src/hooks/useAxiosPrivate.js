import { useEffect } from "react";
import { AxiosPrivate } from "../api/axiosInstance.js";
import useAuth from "./useAuth.js";
import useRefreshToken from "./useRefreshToken.js";

const useAxiosPrivate = () => {
  const { token } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    // Request Interceptor: Attach token dynamically
    const requestIntercept = AxiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor: Handle token expiration
    const responseIntercept = AxiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (
          (error?.response?.status === 403 || error?.response?.status === 401) &&
          !prevRequest?.sent
        ) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return AxiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    // Cleanup function to eject interceptors
    return () => {
      AxiosPrivate.interceptors.request.eject(requestIntercept);
      AxiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [token, refresh]);

  return AxiosPrivate;
};

export default useAxiosPrivate;
