import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotificationPage from "./pages/NotificationPage";
import OnBoardingPage from "./pages/OnBoardingPage";
import SignUpPage from "./pages/SignUpPage";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./lib/axios";


function App() {

  //tanstackQuery
  const {data: authData,isLoading,error} = useQuery({
    queryKey: ['authUser'],
    queryFn: async()=>{
      const res = await axiosInstance.get('/auth/me');
      return res.data
    },
    retry:false
  })

  const authUser = authData?.user
  console.log(authData);
  

  return (
    <>
      <div data-theme="">
      <Routes>
        <Route path="/" element={authUser? <HomePage/>: <Navigate to="/login"/>}/>
        <Route path="/login" element={!authUser? <LoginPage/>: <Navigate to="/"/>}/>
        <Route path="/signup" element={!authUser?<SignUpPage/> : <Navigate to="/"/>}/>
        <Route path="/onboarding" element={authUser?<OnBoardingPage/>: <Navigate to="/login"/>}/>
        <Route path="/notifications" element={authUser?<NotificationPage/>: <Navigate to="/login"/>}/>
        <Route path="/calls" element={authUser?<CallPage/>: <Navigate to="/login"/>}/>
        <Route path="/chats" element={authUser?<ChatPage/>: <Navigate to="/login"/>}/>
      </Routes>
      <Toaster/>
      </div>
    </>
  );
}

export default App;
