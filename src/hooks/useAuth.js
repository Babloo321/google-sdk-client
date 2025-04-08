import { useDispatch, useSelector } from "react-redux";
import { getAccessToken, getUser, setAuth, getRefreshToken } from '../rtk/auth.slice'
 const useAuth = () => {
  const dispatch = useDispatch();
  const token = useSelector(getAccessToken);
  const refreshToken = useSelector(getRefreshToken);
  const user = useSelector(getUser);
  const login = (userData) => {
    dispatch(setAuth(userData)); // ✅ Set auth data when logging in
  };

  const logout = () => {
    dispatch(setAuth({ user: null, accessToken: null, refreshToken: null })); // ✅ Clear auth state
  };

  return { token, user, login, logout, refreshToken };
};

export default useAuth



