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
import useAuthUser from "./hooks/useAuthUser";
import PageLoader from "./components/PageLoader";

function App() {
  //tanstackQuery

  const { isLoading, authUser } = useAuthUser();

  if (isLoading) return <PageLoader />;

  const isAuthenticated = Boolean(authUser);
  const isBoarded = authUser?.isOnBoarded;
  // console.log(isBoarded);

  return (
    <>
      <div data-theme="forest">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated && isBoarded ? (
                <HomePage />
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/login"
            element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/onboarding"
            element={
              isAuthenticated ? (
                isBoarded ? (
                  <Navigate to="/" />
                ) : (
                  <OnBoardingPage />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/notifications"
            element={
              isAuthenticated ? <NotificationPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/calls"
            element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/chats"
            element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />}
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
