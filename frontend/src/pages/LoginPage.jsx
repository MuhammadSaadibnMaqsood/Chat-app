import { ShipWheel } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";
import useLoginMutation from "../hooks/useLoginMutation";

const LoginPage = () => {

  const [loginData, setloginData] = useState({
    email: '',
    password: ''
  });

 const {mutate: loginMutation, isPending,error} = useLoginMutation();

  const handleLogin = (e)=>{
    e.preventDefault();
    loginMutation(loginData);
    
  }
  return (
    <div
      data-theme="forest"
      className="flex items-center justify-center min-h-screen p-6 bg-base-200"
    >
      <div className="flex w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden bg-base-100 border border-primary/20">
        {/* LEFT - SIGNUP FORM */}
        <div className="w-full lg:w-1/2 p-8 space-y-6">
          {/* LOGO */}
          <div className="flex items-center justify-center gap-3">
            <ShipWheel className="size-10 text-primary" />
            <span className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Quick-Chat
            </span>
          </div>

          {/* ERROR MESSAGE IF ANY  */}
          {error && (
            <div className="alert alert-error mb-4">
            <span>{error.response?.data?.message || "Login failed. Please try again."}</span>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold mb-1">Welcome back</h2>
            <p className="text-sm text-gray-500">
              Join Quick-Chat and start your language learning adventure!
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
          

            {/* EMAIL */}
            <div>
              <label className="label-text font-medium">Email</label>
              <input
                type="email"
                placeholder="muhammadsaad@gmail.com"
                value={loginData.email}
                onChange={(e) =>
                  setloginData({ ...loginData, email: e.target.value })
                }
                required
                className="input input-bordered w-full mt-1"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="label-text font-medium">Password</label>
              <input
                type="password"
                placeholder="******"
                value={loginData.password}
                onChange={(e) =>
                  setloginData({ ...loginData, password: e.target.value })
                }
                required
                className="input input-bordered w-full mt-1"
              />
             
            </div>

           

            {/* SUBMIT */}
            <button className="btn btn-primary w-full">
              {isPending ? "logging in...." : "login"}
            </button>

            {/* SWITCH TO SIGN UP */}
            <p className="text-sm text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>

        {/* RIGHT SIDE IMAGE AND TEXT */}
        <div className="hidden lg:flex w-1/2 bg-primary/10 p-10 items-center justify-center">
          <div className="text-center max-w-md">
            <img
              src="/videocall.png"
              alt="Video Call"
              className="w-full rounded-xl shadow"
            />
            <h3 className="mt-6 text-lg font-semibold">
              Connect with Language Partners Worldwide
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Practice conversational skills, make friends, and improve your
              language together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
