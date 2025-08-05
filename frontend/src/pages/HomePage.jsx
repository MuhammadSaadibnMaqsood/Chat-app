import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getFriends,
  getOutgoingFriendsReqs,
  getRecommendedUser,
  sendReq,
} from "../lib/api";
import { useState } from "react";
import { Link } from "react-router";
import { CheckCircleIcon, MapPin, User, UserPlus } from "lucide-react";
import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFounds from "../components/NoFriendsFounds";
import NorecommendedUser from "../components/NorecommendedUser";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingReqIds, setOutgoingReqIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
  });
  const { data: recommendedUsers = [], isLoading: loadingRecommendedUsers } =
    useQuery({
      queryKey: ["users"],
      queryFn: getRecommendedUser,
    });
  const { data: outgoingFriendsReqs = [] } = useQuery({
    queryKey: ["outgoingFriendsReqs"],
    queryFn: getOutgoingFriendsReqs,
  });

  const { mutate: sendFriendReq, isPending } = useMutation({
    mutationFn: sendReq,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendsReqs"] }),
  });

  useEffect(() => {
    const ids = new Set();
    if (outgoingFriendsReqs && outgoingFriendsReqs.length > 0) {
      outgoingFriendsReqs.forEach((req) => {
        ids.add(req.recipient._id);
      });
    }
    setOutgoingReqIds(ids);
  }, [outgoingFriendsReqs]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Your Friends
          </h2>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <User className="mr-2 size-4" />
            Friends Requests
          </Link>
        </div>

        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFounds />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-cols sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Meet New Learner
                </h2>
                <p className="opacity-70">
                  Discover perfect language exchange partner based on your
                  profile
                </p>
              </div>
            </div>
          </div>

          {loadingRecommendedUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <NorecommendedUser />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {recommendedUsers.map((recommended) => {
                const hasReqSent = outgoingReqIds.has(recommended._id);

                return (
                  <div
                    key={recommended._id}
                    className="card bg-base-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="card-body p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="avatar size-12 rounded-full">
                          <img
                            src={recommended.profilePic}
                            alt={recommended.fullName}
                          />
                        </div>

                        <div>
                          <h3 className="font-semibold text-lg">
                            {recommended.fullName}
                          </h3>
                          {recommended.location && (
                            <div className="flex items-center text-xs opacity-70 mt-1">
                              <MapPin className="size-3 mr-1" />
                              {recommended.location}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* LANGUAGE WITH FLAGS  */}

                      <div className="flex flex-wrap gap-1.5">
                        <span className="badge badge-secondary text-xs">
                          {getLanguageFlag(recommended.nativeLanguage)} Native:{" "}
                          {capitialize(recommended.nativeLanguage)}
                        </span>
                        <span className="badge badge-secondary text-xs">
                          {getLanguageFlag(recommended.learningLanguage)}{" "}
                          Learning: {capitialize(recommended.learningLanguage)}
                        </span>
                      </div>
                      {recommended.bio && (
                        <p className="text-xs opacity-70">{recommended.bio}</p>
                      )}

                      <button
                        className={`btn w-full mt-2 ${
                          hasReqSent ? "btn-disabled" : "btn-primary"
                        }`}
                        onClick={() => sendFriendReq(recommended._id)}
                        disabled={hasReqSent || isPending}
                      >
                        
                        {hasReqSent ? (
                          <>
                            <CheckCircleIcon className="size-4 mr-2" />
                            Request Sent
                          </>
                        ) : (
                          <>
                            <UserPlus className="size-4 mr-2" />
                            Send Friend Request
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;

export const capitialize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
