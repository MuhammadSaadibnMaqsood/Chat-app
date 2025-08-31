import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getStreamToken } from "../lib/api";
import useAuthUser from "./useAuthUser";

const useToken = () => {
  const { data: token } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!useAuthUser,
  });
  return {
    token
  }
};

export default useToken;
