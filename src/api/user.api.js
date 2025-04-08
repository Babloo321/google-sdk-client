export const currentUserApi = async(AxiosPrivate) =>{
  try {
    const res = await AxiosPrivate.get("user/me");
    return res;
  } catch (error) {
    return "Getting Error With fetching Current User";
  }
}