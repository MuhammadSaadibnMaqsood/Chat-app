import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { sendReq } from '../lib/api';

const sendRequestMutation = () => {
      const queryClient = useQueryClient();
    
    const { mutate: sendFriendReq, isPending } = useMutation({
    mutationFn: sendReq,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendsReqs"] }),
  });
  return{
    sendFriendReq,
    isPending
  }
}

export default sendRequestMutation