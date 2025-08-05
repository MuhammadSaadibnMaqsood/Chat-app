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
import Layout from "./components/Layout";
import useThemeStore from "./store/useThemeStore";
function App() {
  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();
  if (isLoading) return <PageLoader />;

  const isAuthenticated = Boolean(authUser);
  const isBoarded = authUser?.isOnBoarded;

  return (
    <>
      <div data-theme={theme}>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated && isBoarded ? (
                <Layout showSidebar={true}>
                  <HomePage />
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <LoginPage />
              ) : isBoarded ? (
                <Navigate to="/" />
              ) : (
                <Navigate to="/onboarding" />
              )
            }
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
              isAuthenticated && isBoarded ? (
                <Layout showSidebar={true}>
                  <NotificationPage />
                </Layout>
              ) : !isAuthenticated ? (
                <Navigate to="/login" />
              ) : (
                <Navigate to="/onboarding" />
              )
            }
          />
          <Route
            path="/calls"
            element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/chats/:id"
            element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />}
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
