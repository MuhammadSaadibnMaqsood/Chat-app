import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getOutgoingFriendsReqs } from '../lib/api';

const useOutgoingFriendReq = () => {
    const { data: outgoingFriendsReqs = [] } = useQuery({
        queryKey: ["outgoingFriendsReqs"],
        queryFn: getOutgoingFriendsReqs,
      });
  return {
    outgoingFriendsReqs
  }
}

export default useOutgoingFriendReq