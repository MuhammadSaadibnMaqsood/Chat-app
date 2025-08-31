import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getFriends } from "../lib/api";

const useFriend = () => {
  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
  });
  return {
    friends,
    loadingFriends
  };
};

export default useFriend;
