import React from "react";
import { login } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
const useLoginMutation = () => {
  const queryClient = useQueryClient();
 return useMutation({
  mutationFn: login,
  onSuccess: () => { 
    queryClient.invalidateQueries({ queryKey: ["authUser"] });
    toast.success("Login successfully");
  },
});
}
export default useLoginMutation;
