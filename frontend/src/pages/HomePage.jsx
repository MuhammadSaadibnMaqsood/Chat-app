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
import { User } from 'lucide-react';


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

 const {mutate:sendFriendReq,isPending} = useMutation({
  mutationFn: sendReq,
  onSuccess:()=> queryClient.invalidateQueries({queryKey: ["outgoingFriendsReqs"]})
 })

// useEffect(() => {
//   const ids = new Set();
//   if (outgoingFriendsReqs && outgoingFriendsReqs.length > 0) {
//     outgoingFriendsReqs.forEach((req) => {
//       ids.add(req.id);
//     });
//   }
//   setOutgoingReqIds(ids);
// }, [outgoingFriendsReqs]);

 
  return( 
   
  <div className="p-4 sm:p-6 lg:p-8">
    <div className="container mx-auto space-y-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
        <Link to="/notifications" className="btn btn-outline btn-sm">
            <User className="mr-2 size-4" />
            Friends Requests
        </Link>

      </div>

      {loadingFriends? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg"/>

        </div>
      ):friends.length === 0 ? (
        <p>No friends yet</p>
      ):(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {friends.map((friend)=>(
            <FriendCard key={friend._id} friend ={ friend}/>
          ))}
        </div>
      )}
    </div>

  </div>
);
};

export default HomePage;
