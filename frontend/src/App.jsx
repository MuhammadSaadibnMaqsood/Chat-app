import { Route, Routes } from "react-router";
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
  const {data,isLoading,error} = useQuery({
    queryKey: ['todos'],
    queryFn: async()=>{
      const res = await axiosInstance.get('/auth/me');
      return res.data
    }
  })

  console.log(data);
  

  return (
    <>
      <div data-theme="">
        <button onClick={()=> toast.success("Success")}>Creat a toast</button>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/onboarding" element={<OnBoardingPage/>}/>
        <Route path="/notifications" element={<NotificationPage/>}/>
        <Route path="/calls" element={<CallPage/>}/>
        <Route path="/chats" element={<ChatPage/>}/>
      </Routes>
      <Toaster/>
      </div>
    </>
  );
}

export default App;
