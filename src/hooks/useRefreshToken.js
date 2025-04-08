import {AxiosPublic} from '../api/axiosInstance'
import useAuth from './useAuth';
function useRefreshToken() {
  const { login, refreshToken,user } = useAuth();
  const refresh = async () => {
    const response = await AxiosPublic.post(
      '/user/refresh-token',
      { refreshToken:refreshToken },
      { headers: { 'Content-Type': 'application/json' } },
      { withCredentials: true }
    );
    login({ accessToken: response.data?.data?.accessToken,refreshToken:response.data?.data?.refreshToken,user });
    return response.data?.data?.accessToken;
  };
  return refresh;
}

export default useRefreshToken;


