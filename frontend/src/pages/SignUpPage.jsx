import React, { useState } from "react";
import { ShipWheel } from "lucide-react";
import { Link } from "react-router";
import PageLoader from "../components/PageLoader";
import useSignupMutation from "../hooks/useSignupMutation";
const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // const queryClient = useQueryClient();

  // const {
  //   mutate: signupMuatation,
  //   isPending,
  //   error,
  // } = useMutation({
  //   mutationFn: signup,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });

  const {mutate: signupMuatation,isPending,error } = useSignupMutation();

  const handleSignUp = (e) => {
    e.preventDefault();
    signupMuatation(signupData);
  };

  if (isPending) return <PageLoader />;
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
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold mb-1">Create an Account</h2>
            <p className="text-sm text-gray-500">
              Join Quick-Chat and start your language learning adventure!
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-5">
            {/* FULL NAME */}
            <div>
              <label className="label-text font-medium">Full Name</label>
              <input
                type="text"
                placeholder="Muhammad Saad"
                value={signupData.fullName}
                onChange={(e) =>
                  setSignupData({ ...signupData, fullName: e.target.value })
                }
                required
                className="input input-bordered w-full mt-1"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="label-text font-medium">Email</label>
              <input
                type="email"
                placeholder="muhammadsaad@gmail.com"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
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
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                required
                className="input input-bordered w-full mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 6 characters long.
              </p>
            </div>

            {/* TERMS */}
            <div className="form-control w-full">
              <label className="label cursor-pointer w-full items-start gap-3">
                <input
                  type="checkbox"
                  required
                  className="checkbox checkbox-sm mt-1"
                />
                <span className="text-xs leading-tight flex-1 pt-2">
                  I agree to the{" "}
                  <span className="text-primary hover:underline">
                    terms of service
                  </span>{" "}
                  and{" "}
                  <span className="text-primary hover:underline">
                    privacy policy
                  </span>
                  .
                </span>
              </label>
            </div>

            {/* SUBMIT */}
            <button className="btn btn-primary w-full">
              {isPending ? "Signingup...." : "Create Account"}
            </button>

            {/* SWITCH TO LOGIN */}
            <p className="text-sm text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
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

export default SignUpPage;
