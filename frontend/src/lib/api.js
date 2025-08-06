import axiosInstance from "./axios";
// SIGN UP 
export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};
// LOGIN 
export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};
// LOGOUT 
export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};
// GET USER 
export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    return null;
  }
};
// COMPLETE ONBOADING 
export const completeOnboarding = async (fromData) => {
  const res = await axiosInstance.post("/auth/onboarding", fromData);
  return res.data;
};
// GET FRIENDS 
export const getFriends = async () => {
  const response = await axiosInstance.get("/user/friends");
  return response.data;
};
// GET RECOMMENDED USERS 
export const getRecommendedUser = async () => {
  const response = await axiosInstance.get("/user/");
  return response.data;
};
// GET OUTGOINGREQUESTS 
export const getOutgoingFriendsReqs = async () => {
  const response = await axiosInstance.get("/user/outgoing-friend-requests");
  return response.data;
};
// SEND REQUEST 
export const sendReq = async (userId) => {
  const response = await axiosInstance.post(`/user/friend-request/${userId}`);
  return response.data;
};
// GET FRINED REQS 
export const getFriendRequest = async () => {
  const response = await axiosInstance.get(`/user/friend-requests`);
  return response.data;
};
// ACCEPT FRINED REQUEST 
export const acceptFriendReq = async (requestId) => {
  try {
   
    const response = await axiosInstance.put(`/user/friend-request/${requestId}/accept`);
    
    return response.data;
    
  } catch (error) {
    console.log(error);
    
  }
};
// GET STREAM TOKEN 
export const getStreamToken = async () => {
  const response = await axiosInstance.get(`/chat/token`);
  return response.data;
};
