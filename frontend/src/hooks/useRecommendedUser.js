import React from "react";
import { getRecommendedUser } from "../lib/api";
import { useQuery } from "@tanstack/react-query";

const useRecommendedUser = () => {
  const { data: recommendedUsers = [], isLoading: loadingRecommendedUsers } =
    useQuery({
      queryKey: ["users"],
      queryFn: getRecommendedUser,
    });
  return {recommendedUsers, loadingRecommendedUsers};
};

export default useRecommendedUser;
