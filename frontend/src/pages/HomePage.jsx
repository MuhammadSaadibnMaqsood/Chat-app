import { useEffect, useState } from "react";
import { Link } from "react-router";
import { CheckCircleIcon, MapPin, User, UserPlus } from "lucide-react";
import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFounds from "../components/NoFriendsFounds";
import NorecommendedUser from "../components/NorecommendedUser";
import useFriend from "../hooks/useFriend";
import useRecommendedUser from "../hooks/useRecommendedUser";
import useOutgoingFriendReq from "../hooks/useOutgoingFriendReq";
import sendRequestMutation from "../hooks/sendRequestMutation";

const HomePage = () => {
  const [outgoingReqIds, setOutgoingReqIds] = useState(new Set());

  //FETCH FRIENDS
  const { friends, loadingFriends } = useFriend();

  //FECTH RECOMMENDED
  const {recommendedUsers,loadingRecommendedUsers} = useRecommendedUser();

  //FETCH OUTGOING REQUESTS
  const {outgoingFriendsReqs} = useOutgoingFriendReq();

  //SEND REQ MUTATION
  const {sendFriendReq,isPending} = sendRequestMutation();

  useEffect(() => {
    const newIds = new Set();
    outgoingFriendsReqs?.forEach((req) => {
      newIds.add(req.recipient._id);
    });

    const areEqual =
      newIds.size === outgoingReqIds.size &&
      [...newIds].every((id) => outgoingReqIds.has(id));

    if (!areEqual) {
      setOutgoingReqIds(newIds);
    }
  }, [outgoingFriendsReqs]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        {/* --- Friends Header --- */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Your Friends</h2>
          <Link
            to="/notifications"
            className="btn btn-outline btn-sm flex items-center gap-2"
          >
            <User className="size-4" />
            Friend Requests
          </Link>
        </div>

        {/* --- Friends Grid --- */}
        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFounds />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        {/* --- Recommended Users Section --- */}
        <section>
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-1">
                  Meet New Learners
                </h2>
                <p className="opacity-70 text-sm">
                  Discover perfect language exchange partners based on your
                  profile.
                </p>
              </div>
            </div>
          </div>

          {/* --- Recommended Users Grid --- */}
          {loadingRecommendedUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <NorecommendedUser />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recommendedUsers.map((recommended) => {
                const hasReqSent = outgoingReqIds.has(recommended._id);

                return (
                  <div
                    key={recommended._id}
                    className="card bg-base-100 border hover:shadow-xl transition-all duration-300 rounded-lg"
                  >
                    <div className="card-body p-5 space-y-4">
                      {/* Avatar & Name */}
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img
                              src={recommended.profilePic}
                              alt={recommended.fullName}
                            />
                          </div>
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

                      {/* Languages */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="badge badge-secondary text-xs">
                          {getLanguageFlag(recommended.nativeLanguage)} Native:{" "}
                          {capitalize(recommended.nativeLanguage)}
                        </span>
                        <span className="badge badge-secondary text-xs">
                          {getLanguageFlag(recommended.learningLanguage)}{" "}
                          Learning: {capitalize(recommended.learningLanguage)}
                        </span>
                      </div>

                      {/* Bio */}
                      {recommended.bio && (
                        <p className="text-sm opacity-80 mt-2 line-clamp-3">
                          {recommended.bio}
                        </p>
                      )}

                      {/* Friend Request Button */}
                      <button
                        className={`btn w-full mt-3 ${
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

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
