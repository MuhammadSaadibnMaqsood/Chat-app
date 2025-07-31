import React, { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import {
  Camera,
  Loader2Icon,
  MapPinIcon,
  ShipWheel,
  ShuffleIcon,
} from "lucide-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { LoaderIcon } from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { LANGUAGES } from "../constant";
const OnBoardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [fromData, setfromData] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onBoardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile Onboard succesfully ");
      queryClient.invalidateQueries({ queryKey: [authUser] });
    
    },
    onError: (error)=>{
      console.log(error);
      toast.error(error.response.data.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onBoardingMutation(fromData);
  };
  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setfromData({ ...fromData, profilePic: randomAvatar });
    toast.success('Avatar update successfully')
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Complete Your Profile
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* profilePic containner  */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* image preview  */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {fromData.profilePic ? (
                  <img
                    src={fromData.profilePic}
                    alt="profile pic"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Camera className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>

              {/* Gnerate random avatar button  */}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="btn btn-accent"
                >
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
            </div>

            {/* full Name  */}

            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>

              <input
                type="text"
                name="fullName"
                value={fromData.fullName}
                onChange={(e) =>
                  setfromData({ ...fromData, fullName: e.target.value })
                }
                className="input input-bordered w-full"
                placeholder="Your full name"
              />
            </div>

            {/* bio  */}

            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>

              <input
                type="text"
                name="fullName"
                value={fromData.bio}
                onChange={(e) =>
                  setfromData({ ...fromData, bio: e.target.value })
                }
                className="textarea textarea-bordered h-24"
                placeholder="tell other about your self and you language learning goals"
              />
            </div>

            {/* languages  */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* native language  */}

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Native Langauge</span>
                </label>

                <select
                  name="nativeLanguage"
                  value={fromData.nativeLanguage}
                  onChange={(e) =>
                    setfromData({ ...fromData, nativeLanguage: e.target.value })
                  }
                  className="select select-bordered w-full"
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
              {/* Learning language  */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Learning Langauge</span>
                </label>

                <select
                  name="nativeLanguage"
                  value={fromData.learningLanguage}
                  onChange={(e) =>
                    setfromData({
                      ...fromData,
                      learningLanguage: e.target.value,
                    })
                  }
                  className="select select-bordered w-full"
                >
                  <option value="">Select your learning language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location  */}

            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>

              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={fromData.location}
                  onChange={(e) =>
                    setfromData({ ...fromData, location: e.target.value })
                  }
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="btn btn-success w-full"
            >
              {!isPending ? (
                <>
                  <ShipWheel className="size-5 mr-2" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <Loader2Icon className="size-5 mr-2" />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnBoardingPage;
